"use client";

import { useState } from "react";
import Preloader from "./Preloader";
import CursorGlow from "./CursorGlow";
import Header from "./Header";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Atelier from "./Atelier";
import Manifesto from "./Manifesto";
import Gallery from "./Gallery";
import About from "./About";
import Voices from "./Voices";
import Footer from "./Footer";
import BookingDrawer from "./BookingDrawer";

export default function Site() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string | null>(null);
  const [openCount, setOpenCount] = useState(0);

  const reserve = (serviceId: string | null = null) => {
    setPreset(serviceId);
    setOpenCount((n) => n + 1);
    setOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background">
      <Preloader />
      <CursorGlow />
      <Header onReserve={() => reserve()} />

      <main>
        <Hero onReserve={() => reserve()} />
        <Marquee
          items={[
            "Nails & Hands",
            "The Lash Suite",
            "Hair Architecture",
            "The Pedicure Ritual",
            "Wash & Blow",
          ]}
        />
        <Atelier onBook={(id) => reserve(id ?? null)} />
        <Manifesto />
        <Gallery />
        <About onReserve={() => reserve()} />
        <Voices />
        <Marquee
          dark
          items={[
            "Reserve your transformation",
            "By appointment only",
            "Al Abeir, JVC, Dubai",
          ]}
        />
      </main>

      <Footer onReserve={() => reserve()} />
      <BookingDrawer
        open={open}
        onClose={() => setOpen(false)}
        presetService={preset}
        openCount={openCount}
      />
    </div>
  );
}
