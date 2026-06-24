"use client";

import { motion } from "framer-motion";
import { generateStarPositions } from "@/lib/stars";

const AMBIENT_STARS = generateStarPositions(60);

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b1026]">
      {/* Ambient static star field — quiet, no looping, just texture */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-40"
      >
        {AMBIENT_STARS.map((star, i) => (
          <circle key={i} cx={star.x} cy={star.y} r={0.15} fill="#F5F3EE" />
        ))}
      </svg>

      <div className="relative z-10 max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-6"
        >
          Baku · Data Science · Analytics · Languages
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-display text-4xl sm:text-6xl leading-tight text-[#F5F3EE]"
        >
          Skills that point
          <br />
          somewhere real.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-body text-base sm:text-lg text-[#8A93B8] mt-6 max-w-xl mx-auto"
        >
          Bootcamps in data science, analytics, and Python — plus English,
          Russian, and Excel courses built for people who want a clear next
          step, not just a certificate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#courses"
            className="inline-flex items-center justify-center rounded-full bg-[#F2C14E] px-7 py-3 font-body font-semibold text-[#0B1026] hover:bg-[#f5cd6b] transition-colors"
          >
            See all courses
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-[#8A93B8]/40 px-7 py-3 font-body font-medium text-[#F5F3EE] hover:border-[#8A93B8] transition-colors"
          >
            Talk to an advisor
          </a>
        </motion.div>
      </div>
    </section>
  );
}
