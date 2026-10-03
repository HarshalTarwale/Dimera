"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { Menu, X } from "./icons";

export default function Header({ onReserve }: { onReserve: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-4 glass-panel" : "py-7 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="#top"
          className="font-heading text-2xl tracking-ultra text-foreground lg:text-3xl"
        >
          DIMERA
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[11px] uppercase tracking-luxe text-foreground/70 transition-colors duration-500 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            onClick={onReserve}
            className="group relative overflow-hidden border border-foreground/30 px-7 py-3 font-body text-[11px] uppercase tracking-luxe text-foreground transition-colors duration-500 hover:text-background"
          >
            <span className="relative z-10">Reserve</span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-foreground transition-transform duration-500 group-hover:translate-y-0" />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="lg:hidden"
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="mx-6 mt-4 glass-panel px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-xs uppercase tracking-luxe text-foreground/80"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onReserve();
              }}
              className="mt-2 bg-foreground px-6 py-3 text-left font-body text-[11px] uppercase tracking-luxe text-background"
            >
              Reserve a Transformation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
