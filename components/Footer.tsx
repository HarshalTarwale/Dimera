import { Clock, Instagram, MapPin, Phone } from "./icons";
import Reveal from "./Reveal";

export default function Footer({ onReserve }: { onReserve: () => void }) {
  return (
    <footer id="visit" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="flex flex-col items-center text-center">
          <span className="font-body text-[11px] uppercase tracking-ultra text-accent">
            Visit the Sanctuary
          </span>
          <div className="slow-stroke my-6 w-16" />
          <h2 className="font-heading text-5xl font-light leading-display text-foreground sm:text-6xl lg:text-7xl">
            Find your stillness
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-border pt-12 lg:grid-cols-3">
          <div>
            <MapPin size={18} className="text-accent" />
            <h4 className="mt-4 font-body text-[10px] uppercase tracking-luxe text-foreground/50">
              The Atelier
            </h4>
            <p className="mt-2 font-heading text-xl font-light text-foreground">
              Al Abeir, Shop No. 6, JVC
              <br />
              Dubai, United Arab Emirates
            </p>
          </div>
          <div>
            <Clock size={18} className="text-accent" />
            <h4 className="mt-4 font-body text-[10px] uppercase tracking-luxe text-foreground/50">
              Hours
            </h4>
            <p className="mt-2 font-heading text-xl font-light text-foreground">
              Mon — Sat · 10:00 — 20:00
              <br />
              Sunday · By appointment
            </p>
          </div>
          <div>
            <Phone size={18} className="text-accent" />
            <h4 className="mt-4 font-body text-[10px] uppercase tracking-luxe text-foreground/50">
              Reserve
            </h4>
            <a
              href="tel:+97140000000"
              className="mt-2 block font-heading text-xl font-light text-foreground transition-colors hover:text-accent"
            >
              +971 4 000 0000
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-luxe text-foreground/60 transition-colors hover:text-accent"
            >
              <Instagram size={14} /> @dimera.atelier
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-border pt-12 text-center">
          <p className="font-heading text-3xl font-light tracking-[0.15em] text-foreground">
            DIMERA
          </p>
          <button
            onClick={onReserve}
            className="bg-foreground px-9 py-4 font-body text-[11px] uppercase tracking-luxe text-background transition-colors hover:bg-accent"
          >
            Reserve a Transformation
          </button>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {["Privacy", "Terms", "Cancellation Policy"].map((label) => (
              <a
                key={label}
                href="#"
                className="font-body text-[10px] uppercase tracking-luxe text-foreground/40 transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>
          <p
            suppressHydrationWarning
            className="mt-4 font-body text-[10px] uppercase tracking-luxe text-foreground/30"
          >
            © {new Date().getFullYear()} Dimera. The ritual of transformation,
            refined.
          </p>
        </div>
      </div>
    </footer>
  );
}
