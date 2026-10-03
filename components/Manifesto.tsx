"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      ref={ref}
      className="grain relative h-[75vh] min-h-[480px] overflow-hidden"
    >
      <motion.div
        style={{ y: imageY }}
        className="absolute -inset-y-[18%] inset-x-0"
      >
        <Image
          src="/images/manifesto.jpg"
          alt="A drop of rose-gold polish in the dark"
          fill
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-foreground/55" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <span className="font-body text-[11px] uppercase tracking-ultra text-background/60">
          Manifesto
        </span>
        <h2 className="mt-6 font-heading text-4xl font-light italic leading-display text-background sm:text-6xl lg:text-7xl">
          “Beauty is not a service.
          <br />
          It is a ritual.”
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 h-px w-24 origin-center bg-accent"
        />
      </motion.div>
    </section>
  );
}
