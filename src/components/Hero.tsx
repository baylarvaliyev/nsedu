"use client";

import { motion } from "framer-motion";
import { generateOrganicStars } from "@/lib/stars";
import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import { UI_STRINGS } from "@/lib/uiStrings";
import LanguageSwitcher from "./LanguageSwitcher";
import AscentScene from "./AscentScene";

const AMBIENT_STARS = generateOrganicStars(90);

export default function Hero({
  ready,
  locale = "en" as Locale,
}: {
  ready: boolean;
  locale?: Locale;
}) {
  const t = UI_STRINGS[locale];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b1026]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(242,193,78,0.1),transparent_60%)]" />
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher currentLocale={locale} />
      </div>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-[120%] w-[120%] -top-[10%] -left-[10%] animate-star-drift opacity-50"
      >
        {AMBIENT_STARS.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="#F5F3EE"
            opacity={star.opacity}
            className="animate-twinkle"
            style={{ animationDelay: `${star.delay}s` }}
          />
        ))}
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        <AscentScene ready={ready} />
      </div>

      <div className="relative z-10 max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-6"
        >
          {t.hero_eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-display text-4xl sm:text-6xl leading-tight text-[#F5F3EE]"
        >
          {t.hero_title_line1}
          <br />
          {t.hero_title_line2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-body text-base sm:text-lg text-[#8A93B8] mt-6 max-w-xl mx-auto"
        >
          {t.hero_subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={localizedPath("/courses", locale)}
            className="inline-flex items-center justify-center rounded-full bg-[#F2C14E] px-7 py-3 font-body font-semibold text-[#0B1026] hover:bg-[#f5cd6b] transition-colors"
          >
            {t.hero_cta_courses}
          </a>
          <a
            href={`${localizedPath("/courses", locale)}#contact`}
            className="inline-flex items-center justify-center rounded-full border border-[#8A93B8]/40 px-7 py-3 font-body font-medium text-[#F5F3EE] hover:border-[#8A93B8] transition-colors"
          >
            {t.hero_cta_advisor}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
