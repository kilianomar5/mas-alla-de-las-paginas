// netlify/functions/newsletter-subscribe.js
export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const text = await req.text();
    // Body-size cap: legitimate payloads are tiny; anything large is abuse/DoS.
    if (text.length > 10000) {
      return new Response(JSON.stringify({ error: "Payload too large" }), {
        status: 413,
        headers: { "Content-Type": "application/json" },
      });
    }

    const params = new URLSearchParams(text);
    const turnstileToken = params.get("turnstileToken");

    // Consent must be proven server-side, not just by the client checkbox.
    if (params.get("agreeToTerms") !== "true") {
      return new Response(JSON.stringify({ error: "Consent is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Normalize + validate email. This is the address we email, so plus/dot aliases
    // are preserved (not stripped); we only trim, lowercase, and bound the length.
    const email = (params.get("email") || "").trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 254 || !emailPattern.test(email)) {
      return new Response(JSON.stringify({ error: "A valid email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sanitize name before it reaches MailerLite: it is rendered back in confirmation
    // emails and the admin dashboard, so strip HTML/personalization brackets and control
    // characters and cap the length to neutralize injection. Spaces/hyphens are kept so
    // real names ("Jean-Luc", "Mary Ann") survive. Empty-after-strip means "no name".
    const name =
      (params.get("name") || "")
        .replace(/[<>{}]/g, "")
        .replace(/[\u0000-\u001f\u007f]/g, "")
        .trim()
        .slice(0, 100) || undefined;

    // Cloudflare Turnstile: verify the token server-side. Bots that POST directly to
    // this endpoint (bypassing the browser widget) have no valid token and are rejected
    // here, before we ever touch MailerLite.
    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ error: "Verification required" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Only Netlify's own client-IP header is trustworthy; X-Forwarded-For is spoofable
    // and must never feed a security decision.
    const remoteIp = req.headers.get("x-nf-client-connection-ip") || "";
    const verifyBody = new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY || "",
      response: turnstileToken,
    });
    if (remoteIp) verifyBody.set("remoteip", remoteIp);

    // 10s timeout so a Cloudflare network hiccup can't hang the function.
    const verifyController = new AbortController();
    const verifyTimeout = setTimeout(() => verifyController.abort(), 10000);
    let verifyData;
    try {
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: verifyBody.toString(),
          signal: verifyController.signal,
        },
      );
      verifyData = await verifyRes.json();
    } catch (err) {
      console.error("Turnstile verify request failed:", err);
      return new Response(
        JSON.stringify({ error: "Verification unavailable" }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    } finally {
      clearTimeout(verifyTimeout);
    }

    if (!verifyData.success) {
      console.warn("Turnstile verification failed:", verifyData["error-codes"]);
      return new Response(
        JSON.stringify({ error: "Verification failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Bind the token to this form: the widget was rendered with action "newsletter",
    // so reject a valid token minted for a different action.
    if (verifyData.action !== "newsletter") {
      console.warn("Turnstile action mismatch:", verifyData.action);
      return new Response(
        JSON.stringify({ error: "Verification failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Optional hostname allowlist. Set TURNSTILE_HOSTNAMES (comma-separated) to pin the
    // token to your own domains; left unset it's skipped so deploy previews keep working.
    const allowedHostnames = (process.env.TURNSTILE_HOSTNAMES || "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);
    if (allowedHostnames.length && !allowedHostnames.includes(verifyData.hostname)) {
      console.warn("Turnstile hostname not allowed:", verifyData.hostname);
      return new Response(
        JSON.stringify({ error: "Verification failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
    const payload = {
      email,
      fields: { name },
      groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : [],
      status: "unconfirmed",
    };

    const mlResponse = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!mlResponse.ok) {
      // Tolerate a non-JSON error body so a bad response can't throw into a bare 500.
      const errorData = await mlResponse.text().catch(() => "");
      console.error("MailerLite error:", mlResponse.status, errorData);
      return new Response(
        JSON.stringify({ error: "MailerLite subscription failed" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/newsletter-subscribe",
  // Netlify native rate limiting: per-visitor quota. Signups are rare, so 5 requests
  // per 60s per IP is generous for humans and hostile to abuse loops. (Function rate
  // limits must live here, not in netlify.toml.)
  rateLimit: {
    windowSize: 60,
    windowLimit: 5,
    aggregateBy: ["ip", "domain"],
  },
};
