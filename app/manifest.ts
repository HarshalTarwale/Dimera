import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dimera",
    short_name: "Dimera",
    description:
      "A sophisticated digital sanctuary for ladies to explore, book, and experience premium salon services including precision haircuts, color artistry, and aesthetic nail and lash treatments.",
    start_url: "/",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
    icons: [
      { src: "/icon.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
  };
}
