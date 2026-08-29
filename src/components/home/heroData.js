const safehouse = "/mas-alla-de-las-paginas/images/a-safehouse-in-the-hills.jpg";
import sevilla from "../../assets/images/entre-sevilla-y-el-desierto.jpg";
import miami from "../../assets/images/la-ciudad-del-pecado-miami.jpg";
import crimen from "../../assets/images/un-crimen-elegante.jpg";

export const heroSlides = [
  {
    id: 1,
    title: "A SAFEHOUSE IN THE HILLS",
    titleLines: ["A SAFEHOUSE", "IN THE HILLS"],
    subtitle: "Próximamente",
    description:
      "Una casa de seguridad en las colinas de Hollywood. Drogas, armas y un botín que todos quieren. La tensión aumenta cuando el pasado de Los Ángeles llama a la puerta.",
    ctaText: "Próximamente",
    ctaLink: "#",
    bgImage: safehouse,
    overlayColor: "rgba(21, 21, 21, 0.4)",
    bookCover: safehouse,
    textColor: "white",
    alignment: "left",
    badge: "Próximo Lanzamiento",
  },
  {
    id: 2,
    title: "ENTRE SEVILLA Y EL DESIERTO",
    titleLines: ["ENTRE SEVILLA", "Y EL DESIERTO"],
    subtitle: "Adrián Andrés Díaz Fortes & Samuel Alemán Durán",
    description:
      "Una historia de contrastes donde el calor de las dunas del desierto choca con la histórica arquitectura y la vida vibrante de las calles de Sevilla.",
    ctaText: "Comprar ahora",
    ctaLink: "https://wwww.enlace.com",
    bgImage: sevilla,
    overlayColor: "rgba(21, 21, 21, 0.3)",
    bookCover: sevilla,
    textColor: "white",
    alignment: "left",
  },
  {
    id: 3,
    title: "LA CIUDAD DEL PECADO MIAMI",
    titleLines: ["LA CIUDAD", "DEL PECADO", "MIAMI"],
    subtitle: "Bienvenida a Miami. Donde los sueños brillan... y la tentación nunca duerme.",
    description:
      "Neón, playas y ambición. Adéntrate en el lado oscuro y seductor de la ciudad del vicio, donde cada decisión tiene un precio bajo el sol de Florida.",
    ctaText: "Comprar ahora",
    ctaLink: "https://wwww.enlace.com",
    bgImage: miami,
    overlayColor: "rgba(21, 21, 21, 0.4)",
    bookCover: miami,
    textColor: "white",
    alignment: "left",
  },
  {
    id: 4,
    title: "UN CRIMEN ELEGANTE",
    titleLines: ["UN CRIMEN", "ELEGANTE"],
    subtitle: "El último golpe define tu legado.",
    description:
      "Tres amigos. Un pasado roto. Un último golpe. El arte esconde historias, pero algunas solo pueden ser robadas bajo la fría mirada de un museo protegido por láseres.",
    ctaText: "Próximamente",
    ctaLink: "#",
    bgImage: crimen,
    overlayColor: "rgba(21, 21, 21, 0.5)",
    bookCover: crimen,
    textColor: "white",
    alignment: "left",
  },
];

export const chroniclesBooks = [
  {
    id: 1,
    title: "ENTRE SEVILLA Y EL DESIERTO",
    flatCover: sevilla,
    status: "available",
    ctaText: "Comprar ahora",
    ctaLink: "#",
  },
  {
    id: 2,
    title: "LA CIUDAD DEL PECADO MIAMI",
    flatCover: miami,
    status: "available",
    ctaText: "Comprar ahora",
    ctaLink: "https://hotmart.com/es/marketplace/productos/la-ciudad-del-pecado-miami/T106706706C",
  },
  {
    id: 3,
    title: "A SAFEHOUSE IN THE HILLS",
    flatCover: safehouse,
    status: "coming-soon",
    ctaText: "Próximamente",
    ctaLink: "#",
  },
  {
    id: 4,
    title: "UN CRIMEN ELEGANTE",
    flatCover: crimen,
    status: "coming-soon",
    ctaText: "Próximamente",
    ctaLink: "#",
  },
];

export const mapPoints = [
  {
    id: 1,
    title: "Sevilla",
    description:
      "La histórica ciudad andaluza. Sus calles estrechas y arquitectura clásica esconden secretos que conectan directamente con la inmensidad del desierto.",
    image: "",
    position: { top: "35%", left: "75%" },
    type: "city",
  },
  {
    id: 2,
    title: "El Desierto",
    description:
      "Un vasto océano de dunas de arena bajo un sol implacable. Un lugar de aislamiento, misterio y peligro que contrasta con la civilización de Sevilla.",
    image: "",
    position: { top: "65%", left: "25%" },
    type: "landscape",
  },
  {
    id: 3,
    title: "Miami Beach",
    description:
      "El epicentro del neón, la fiesta y el vicio. Las palmeras y los hoteles Art Deco de Ocean Drive ocultan el lado más oscuro de la ciudad del pecado.",
    image: "",
    position: { top: "85%", left: "20%" },
    type: "city",
  },
  {
    id: 4,
    title: "Hollywood Hills",
    description:
      "Las colinas de Los Ángeles, hogar de estrellas y mansiones ocultas. Aquí se encuentra la casa de seguridad donde el dinero, las armas y la paranoia se mezclan con el humo.",
    image: "",
    position: { top: "45%", left: "15%" },
    type: "location",
  },
  {
    id: 5,
    title: "El Museo de Arte",
    description:
      "Un edificio imponente que custodia obras de valor incalculable tras sistemas láser y bóvedas acorazadas. El escenario perfecto para un golpe definitivo que podría limpiar un pasado roto.",
    image: "",
    position: { top: "25%", left: "55%" },
    type: "location",
  }
];