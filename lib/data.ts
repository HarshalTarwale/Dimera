export type Service = {
  id: string;
  name: string;
  collection: string;
  description: string;
  price: string;
  duration: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "manicure",
    name: "Manicure",
    collection: "Nails & Hands",
    description:
      "Sculpted, buffed, and lacquered — the foundational ritual for hands that speak before you do.",
    price: "from 120",
    duration: "45 min",
    image: "/images/manicure.jpg",
  },
  {
    id: "pedicure",
    name: "Pedicure",
    collection: "Nails & Hands",
    description:
      "A restorative soak and meticulous finish for feet that carry you through the world.",
    price: "from 150",
    duration: "60 min",
    image: "/images/pedicure.jpg",
  },
  {
    id: "nails",
    name: "Nail Art",
    collection: "Nails & Hands",
    description:
      "Sculptural extensions and hand-painted detail — nails as wearable architecture.",
    price: "from 180",
    duration: "75 min",
    image: "/images/nail-art.jpg",
  },
  {
    id: "lashes",
    name: "Lash Suite",
    collection: "The Lash Suite",
    description:
      "Ethereal extensions, individually placed — a flutter that transforms the entire gaze.",
    price: "from 250",
    duration: "90 min",
    image: "/images/lash-suite.jpg",
  },
  {
    id: "hair-color",
    name: "Hair Color",
    collection: "Hair Architecture",
    description:
      "Fluid gradients of copper and rose-gold, painted by hand for dimension that moves with you.",
    price: "from 320",
    duration: "120 min",
    image: "/images/hair-color.jpg",
  },
  {
    id: "haircut",
    name: "Haircut",
    collection: "Hair Architecture",
    description:
      "Precision cuts shaped to your bone structure — the architecture of a silhouette.",
    price: "from 200",
    duration: "60 min",
    image: "/images/haircut.jpg",
  },
  {
    id: "hair-wash",
    name: "Wash & Blow",
    collection: "Hair Architecture",
    description:
      "A meditative cleanse at the basin, finished with a sculpted blow-dry that lasts.",
    price: "from 130",
    duration: "45 min",
    image: "/images/wash-blow.jpg",
  },
];

export const navLinks = [
  { label: "Atelier", href: "#atelier" },
  { label: "Gallery", href: "#gallery" },
  { label: "Ritual", href: "#about" },
  { label: "Voices", href: "#voices" },
  { label: "Visit", href: "#visit" },
];

export const galleryItems = [
  {
    src: "/images/gallery-lashes.jpg",
    span: "row-span-2",
    technique: "Soft natural lashes",
    speed: 50,
  },
  {
    src: "/images/gallery-manicure.jpg",
    span: "",
    technique: "Sculpted nude manicure",
    speed: -30,
  },
  {
    src: "/images/gallery-balayage.jpg",
    span: "row-span-2",
    technique: "Caramel balayage",
    speed: 40,
  },
  {
    src: "/images/gallery-beige.jpg",
    span: "",
    technique: "Beige serenity",
    speed: -40,
  },
];

export const testimonials = [
  {
    quote:
      "I have never felt more held. The lash suite is not a treatment — it is a meditation. I left a different woman.",
    name: "Rania M.",
    detail: "Lash Suite · monthly ritual",
  },
  {
    quote:
      "Leila read my hair like a canvas. The copper she painted moves like liquid light. I have never received so many quiet glances.",
    name: "Sophia D.",
    detail: "Hair Color · first visit",
  },
  {
    quote:
      "The nails are sculpture. Six weeks later, still flawless. Dimera is the only place my hands trust.",
    name: "Hala K.",
    detail: "Nail Art · devotee",
  },
];

export const stylists = [
  { id: "any", name: "No Preference", role: "First available artisan" },
  { id: "amira", name: "Amira", role: "Master Lash & Nail Artist" },
  { id: "leila", name: "Leila", role: "Hair Color Specialist" },
  { id: "yasmin", name: "Yasmin", role: "Precision Cut & Stylist" },
  { id: "noor", name: "Noor", role: "Spa & Pedicure Ritualist" },
];

export const timeSlots = [
  "10:00",
  "11:30",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
  "19:00",
];

export const ease = [0.16, 1, 0.3, 1] as const;
