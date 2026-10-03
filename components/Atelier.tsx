"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { services } from "@/lib/data";

export default function Atelier({
  onBook,
}: {
  onBook: (serviceId?: string) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  // Distance the track must travel so its last card clears the viewport.
  const x = useTransform(scrollYProgress, (progress) => {
    const track = trackRef.current;
    if (!track) return 0;
    const distance = Math.max(0, track.scrollWidth - window.innerWidth + 96);
    return -progress * distance;
  });

  return (
    <section
      id="atelier"
      ref={sectionRef}
      className="relative h-[380vh] bg-background"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 lg:px-10 lg:pt-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-body text-[11px] uppercase tracking-ultra text-accent"
          >
            The Transformation Library
          </motion.span>
          <div className="slow-stroke my-5 w-16" />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-5xl font-light leading-none text-foreground sm:text-6xl lg:text-7xl"
            >
              The Service <span className="italic text-accent">Atelier</span>
            </motion.h2>
            <span className="hidden font-body text-[10px] uppercase tracking-ultra text-foreground/40 sm:block">
              Keep scrolling — the atelier moves with you
            </span>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-10 flex w-max gap-6 pl-6 lg:mt-14 lg:gap-10 lg:pl-10"
        >
          {services.map((service, i) => (
            <article
              key={service.id}
              className="group relative w-[72vw] shrink-0 sm:w-[46vw] lg:w-[26vw]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 26vw, (min-width: 640px) 46vw, 72vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-90" />
                <span className="absolute left-5 top-5 font-body text-[10px] uppercase tracking-luxe text-background/80">
                  {String(i + 1).padStart(2, "0")} — {service.collection}
                </span>
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-background/95 p-4 backdrop-blur transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <button
                    onClick={() => onBook(service.id)}
                    className="w-full bg-foreground py-3 font-body text-[10px] uppercase tracking-luxe text-background transition-colors hover:bg-accent"
                  >
                    Quick Book · {service.price} AED
                  </button>
                </div>
              </div>
              <h3 className="mt-6 font-heading text-3xl font-light text-foreground lg:text-4xl">
                {service.name}
              </h3>
              <p className="mt-3 max-w-xs font-body text-sm font-light leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="font-body text-xs uppercase tracking-luxe text-foreground/60">
                  {service.price} AED · {service.duration}
                </span>
                <button
                  onClick={() => onBook(service.id)}
                  className="font-body text-[10px] uppercase tracking-luxe text-accent transition-colors duration-300 hover:text-foreground"
                >
                  Quick Book →
                </button>
              </div>
            </article>
          ))}

          <div className="flex w-[60vw] shrink-0 items-center justify-center sm:w-[40vw] lg:w-[24vw]">
            <button onClick={() => onBook()} className="group text-center">
              <span className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-accent/40 font-heading text-2xl font-light italic text-accent transition-all duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-background">
                Reserve
              </span>
            </button>
          </div>
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-6 lg:px-10">
          <div className="h-px w-full bg-border">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-px origin-left bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
