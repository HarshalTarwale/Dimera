"use client";

import { useEffect, useRef } from "react";

/** Soft warm halo that trails the pointer (hidden on touch devices via CSS). */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - 140}px, ${y - 140}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed top-0 left-0 z-[60] h-[280px] w-[280px] rounded-full"
      style={{ transform: "translate3d(-300px, -300px, 0)" }}
    />
  );
}
