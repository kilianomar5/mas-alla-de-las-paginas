import davga from "../../assets/images/Davga_HR.jpg";
import davgaWebp from "../../assets/images/Davga_HR.webp";
import pallemina from "../../assets/images/Pallemina_HR.jpg";
import palleminaWebp from "../../assets/images/Pallemina_HR.webp";
import queen from "../../assets/images/Queen-Velardis-and-Lord-Xuren.jpg";
import queenWebp from "../../assets/images/Queen-Velardis-and-Lord-Xuren.webp";

// @/data/heroData.js
export const heroSlides = [
  {
    id: 3,
    title: "Davaga",
    titleLines: ["DAVGA"],
    subtitle: "An Endless War novella",
    description:
      "A prisoner with no memory. Davga’s dormant magic stirs with the arrival of a mysterious stranger. As past and power collide, one question remains: who is the real Davga Tranfe’er, and what destiny awaits him?",
    ctaText: "Buy it now",
    ctaLink: "https://shorturl.at/anuOB",
    bgImage: "/images/book4-bg.jpg",
    overlayColor: "rgba(21, 21, 21, 0.2)",
    bookCover: "/images/book4-cover.png",
    textColor: "white",
    alignment: "left",
    badge: "New Book",
  },
  {
    id: 1,
    title: "GHARANTIA'S GUARDIAN",
    titleLines: ["GHARANTIA'S", "GUARDIAN"],
    subtitle: "Chronicles of the Endless War - Book 1",
    description:
      "A war between gods is coming, and Gharantia stands in its path. As prophetic dreams and mysterious strangers signal the end of peace, Princess Melane and her guardian Criterious must uncover the truth before it’s too late.",
    ctaText: "Buy it now",
    ctaLink: "https://mybook.to/LKYaLA",
    bgImage: "/images/book1-bg.jpg",
    overlayColor: "rgba(21, 21, 21,.3 )",
    bookCover: "/images/book1-cover.png",
    textColor: "white",
    alignment: "left",
  },
  {
    id: 2,
    title: "GHARANTIA'S FURY",
    titleLines: ["GHARANTIA'S", "FURY"],
    subtitle: "Chronicles of the Endless War - Book 2",
    description:
      "Relationships fracture, new enemies rise, and the true cost of war is laid bare. But as their greatest adversary approaches, are Gharantia’s defenders ready to stand and fight?",
    ctaText: "Buy it now",
    ctaLink: "https://mybook.to/bXI2",
    bgImage: "/images/book2-bg.jpg",
    overlayColor: "rgba(21, 21, 21, 0.5)",
    bookCover: "/images/book2-cover.png",
    textColor: "white",
    alignment: "left",
  },

  {
    id: 4,
    title: "GHARANTIA'S FATE",
    titleLines: ["GHARANTIA'S", "FATE"],
    subtitle: "Chronicles of the Endless War - Book 3",
    description:
      "With the city in ruins, the royal household is pulled in different directions; Criterious tending to the people, Melane looking north, and Queen Velardis consumed by a perilous obsession behind palace walls. As Xuren’s chilling message lingers, a darker conflict begins to unfold.",
    ctaText: "Coming Soon",
    ctaLink: "#",
    bgImage: "/images/book3-bg.jpg",
    overlayColor: "rgba(21, 21, 21, 0.2)",
    bookCover: "/images/book3-cover.png",
    textColor: "white",
    alignment: "left",
  },
];

export const chroniclesBooks = [
  {
    id: 5,
    title: "DAVGA \n An Endless War novella",
    flatCover: "/images/book4-flat.jpg",
    status: "new-release",
    ctaText: "Buy it now",
    ctaLink: "https://shorturl.at/anuOB",
  },
  // {
  //   id: 1,
  //   title: "GHARANTIA'S SHADOW \n Novella 1",
  //   flatCover: "/images/novella-Sh-cover.jpg",
  //   status: "get-it-free",
  //   ctaText: "Get it free",
  //   ctaLink: "#newsletter",
  // },
  {
    id: 2,
    title: "GHARANTIA'S GUARDIAN \n Book 1",
    flatCover: "/images/book1-flat.jpg",
    status: "available",
    ctaText: "Buy it now",
    ctaLink: "https://mybook.to/LKYaLA",
  },
  {
    id: 3,
    title: "GHARANTIA'S FURY \n Book 2",
    flatCover: "/images/book2-flat.jpg",
    status: "available",
    ctaText: "Buy it now",
    ctaLink: "https://mybook.to/bXI2",
  },

  {
    id: 4,
    title: "GHARANTIA'S FATE \n Book 3",
    flatCover: "/images/book3-flat.jpg",
    status: "coming-soon",
    ctaText: "Coming soon",
    ctaLink: "#",
  },
  //   {
  //   id: 4,
  //   title: "EMPIRE OF SHADOWS",
  //   subtitle: "Chronicles of the Endless War - Book 4",
  //   flatCover: "//imgs/book4-flat.jpg",
  //   status: "pre-order",
  //   ctaText: "Pre-order Now",
  //   ctaLink: "#"
  // }
];

export const mapPoints = [
  {
    id: 1,
    title: "The Spirit of the Ocean’s Waters",
    description:
      "The Spirit of the Ocean, one of the fael gods, extends his sway eastward against the Northern Storm, his subjects clashing over the border with relentless fury. Legend holds he has many wives and countless children, most of the latter drafted into his vast army, asserting his presence over these contested waters.",
    image: "",
    position: { top: "26%", left: "36%" },
    type: "god",
  },
  {
    id: 2,
    title: "Jasper (JAS-per)",
    description:
      "Hidden within the northern mountains, Jasper is a free city beyond Lord Xuren’s grasp, where the crown passes from father to son. Among the city’s few dealings with the outside world is the twice-yearly delivery of tentil tea to the mage Tower, believed to bolster vitality and longevity.",
    image: "",
    position: { top: "5%", left: "25%" },
    type: "city",
  },
  {
    id: 3,
    title: "The Northern Sea",
    description:
      "With ruthless tyranny, the creature-fael dictator known as the Northern Storm—or Notovan in Old Speak—rules these waters. His legion hunts the icy currents, and any ship entering without permission pays a heavy toll.",
    image: "",
    position: { top: "26%", left: "50%" },
    type: "god",
  },
  {
    id: 4,
    title: "Port of Rakul (RAH-kul)",
    description:
      "Port of Rakul (RAH-kul)Said to mark the northernmost reach of Lord Xuren’s power, this frozen port is little more than ice, stone, and chains. Its prison swallows political enemies and the unworthy alike, and none who are sent here are ever heard from again.",
    image: "",
    position: { top: "1.6%", left: "81%" },
    type: "port",
  },
  {
    id: 5,
    title: "Lere De-Ohr Isles (LEHR deh-OHR)",
    description:
      "A chain of three islands off the northeastern coast of Simild, nominally independent and hostile to outsiders. Long used as pirate havens, the islands’ loyalties shift with the tides.",
    image: "",
    position: { top: "34%", left: "88.7%" },
    type: "islands",
  },
  {
    id: 6,
    title: "Gharantia City (GAR-an-tee-ah)",
    description:
      "The capital of the realm of Gharantia. The palace sits upon a hill, with the Obsivanta mountain range rising behind it and the great port spread out before it. Within the palace grounds stands the Black Tower, housing the famed Red Stone. Queen Velardis rules her twelve duchies from this central seat of power, assisted by her cousin Melane and Melane’s husband, Criterious, the Guardian.",
    image: "",
    position: { top: "56.9%", left: "69.1%" },
    type: "city",
  },
  {
    id: 7,
    title: "Simild (SIM-ild)",
    description:
      "A coastal duchy of Gharantia, wealthy through maritime trade and the realm’s largest exporter of salt. Its inland regions are fertile and tightly controlled, with ownership restricted to a small number of powerful families.",
    image: "",
    position: { top: "56.9%", left: "90%" },
    type: "Duchy",
  },
  {
    id: 8,
    title: "Constance (KON-stanss)",
    description:
      "An eastern duchy of Gharantia, once the first kingdom in the region, with its original seat at the ancient walled city of Cross Lands. Renowned for marble quarries and fertile lands. Capital: Callamerta (KAL-ah-mer-tah).",
    image: "",
    position: { top: "65.9%", left: "90%" },
    type: "Duchy",
  },
  {
    id: 9,
    title: "The Standing Stones of Brutalies (BROO-tah-lees)",
    description:
      "Once the centre of an ancient people, now a desolate, abandoned region. The myths survive only in the memories of the oldest folk. A dirt track through this forsaken land leads to Jurnaste (JUR-nah-stay), once a great city now reduced to ash.",
    image: "",
    position: { top: "94%", left: "77%" },
    type: "ruins",
  },
  {
    id: 10,
    title: "Mountain Homestead",
    description:
      "Childhood home of Pilt, nestled in a remote valley high in the mountains. The surrounding area is dotted with flocks, tended by the neighbouring shepherds.",
    image: "",
    position: { top: "72%", left: "64%" },
    type: "Homestead",
  },
  {
    id: 12,
    title: "Larches (LAR-chess)",
    description:
      "A small, mountainous duchy of Gharantia, formerly independent before being absorbed under the rule of Queen Solariss. Its lands lie within a valley encircled by the Larstack Mountains, making access difficult. The fast-flowing River Loothe runs through the duchy. It is the home duchy of Criterious, the Guardian of Gharantia, and the region is known for its many shrines and enduring local traditions.",
    image: "",
    position: { top: "74%", left: "52.4%" },
    type: "Duchy",
  },
  {
    id: 13,
    title: "Calarom (KAH-lah-rom)",
    description:
      "A duchy bordering Larches, Gharantia, Obsilye, and the sparsely populated Yeojinia. Its territory lies between mountains and fertile plains, forming a natural frontier and crossroads. The people are known for their martial prowess, and their banners display the snarling grey fox, symbol of the grassy Calarom plains. Capital: High Hilt.",
    image: "",
    position: { top: "70%", left: "46%" },

    type: "Duchy",
  },
  {
    id: 14,
    title: "Obsilye (OB-sil-eye)",
    description:
      "The largest duchy of Gharantia after the Gharantian lands themselves, crescent-shaped along the western coast. Rich from trade, it contains the natural port of Rameel and maintains a strong fleet. Ruled by Lord Mikarf, who exercises careful control over the coast and neighbouring territories to secure his duchy’s wealth.",
    image: "",
    position: { top: "62%", left: "32%" },
    type: "Duchy",
  },
  {
    id: 15,
    title:
      "Gulsbad (GULS-bad) and Neighbours: Weathers Worn (WEH-thers WORN) & La’em (LAH-em) ",
    description:
      "A cluster of territories bordering Obsilye to the east and the Barren Flats to the west. Historically established by one of the queens as a buffer at the edge of the realm, the lands were granted to the region’s strongest clans, whose family names now identify the territories. The terrain is infertile, and the inhabitants are often nomadic, herding sheep and cattle across the rugged land.",
    image: "",
    position: { top: "67%", left: "25%" },
    type: "Duchy",
  },
  {
    id: 16,
    title: "The Barren Flats",
    description:
      "A wide stretch of prairie, sparsely vegetated and unoccupied by humans, yet rich in wildlife. The flats rise toward the Barren Mountains and cliffs, forming a rugged natural barrier that protects the interior from any approach from the western seas.",
    image: "",
    position: { top: "62%", left: "15%" },
    type: "Grasslands",
  },
  {
    id: 17,
    title: "Davga",
    description: "He was not meant to stay hidden forever.",
    image: davga,
    imageWebp: davgaWebp,
    position: { top: "1.6%", left: "78%" },
    type: "",
  },
  {
    id: 18,
    title: "Pallemina",
    description: "Two natures, one will",
    image: pallemina,
    imageWebp: palleminaWebp,
    position: { top: "48%", left: "68%" },
    type: "",
  },
  {
    id: 19,
    title: "Queen Velardis and Lord Xuren",
    description: "The throne is hers, but the game is his",
    image: queen,
    imageWebp: queenWebp,
    position: { top: "57%", left: "66%" },
    type: "",
  },
];
