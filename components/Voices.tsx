import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";

export default function Voices() {
  return (
    <section
      id="voices"
      className="bg-foreground py-28 text-background lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 flex flex-col items-center text-center lg:mb-24">
          <span className="font-body text-[11px] uppercase tracking-ultra text-accent">
            Voices
          </span>
          <div className="my-6 h-px w-16 bg-accent/50" />
          <h2 className="font-heading text-5xl font-light leading-display sm:text-6xl lg:text-7xl">
            The women who <span className="shimmer-text italic">return</span>
          </h2>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="flex flex-col">
              <span className="font-heading text-6xl font-light leading-none text-accent/60">
                “
              </span>
              <p className="-mt-4 font-heading text-2xl font-light italic leading-relaxed text-background/90">
                {t.quote}
              </p>
              <div className="mt-8">
                <p className="font-body text-sm tracking-luxe text-background">
                  {t.name}
                </p>
                <p className="mt-1 font-body text-[10px] uppercase tracking-luxe text-background/50">
                  {t.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
