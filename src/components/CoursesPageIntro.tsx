"use client";

import { motion } from "framer-motion";
import { generateOrganicStars } from "@/lib/stars";
import type { Locale } from "@/lib/locale";

const AMBIENT_STARS = generateOrganicStars(40);

const INTRO_STRINGS = {
  en: {
    eyebrow: "All Programs",
    heading: "Find your direction.",
    subtitle: "Browse by category, or scroll to see everything we offer.",
  },
  az: {
    eyebrow: "Bütün Proqramlar",
    heading: "İstiqamətinizi tapın.",
    subtitle: "Kateqoriyaya görə baxın, və ya bütün təklif etdiyimiz kursları görmək üçün aşağı sürüşdürün.",
  },
  ru: {
    eyebrow: "Все программы",
    heading: "Найдите свой путь.",
    subtitle: "Просматривайте по категориям или прокрутите вниз, чтобы увидеть всё, что мы предлагаем.",
  },
} as const;

export default function CoursesPageIntro({
  locale = "en" as Locale,
  courseCount,
  categoryCount,
}: {
  locale?: Locale;
  courseCount: number;
  categoryCount: number;
}) {
  const t = INTRO_STRINGS[locale];

  return (
    <section className="relative overflow-hidden bg-[#0b1026] pt-32 pb-16 px-6">
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full animate-star-drift opacity-60"
      >
        {AMBIENT_STARS.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y * 0.6}
            r={star.size}
            fill="#F5F3EE"
            opacity={star.opacity}
            className="animate-twinkle"
            style={{ animationDelay: `${star.delay}s` }}
          />
        ))}
      </svg>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4"
        >
          {t.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl text-[#F5F3EE] mb-4"
        >
          {t.heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-body text-base text-[#8A93B8] mb-8"
        >
          {t.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center gap-10"
        >
          <div>
            <p className="font-display text-2xl text-[#F2C14E]">{courseCount}+</p>
            <p className="font-body text-xs text-[#8A93B8] uppercase tracking-wide">
              {locale === "az" ? "Kurs" : locale === "ru" ? "Курсов" : "Courses"}
            </p>
          </div>
          <div className="w-px h-8 bg-[#8A93B8]/20" />
          <div>
            <p className="font-display text-2xl text-[#F2C14E]">{categoryCount}</p>
            <p className="font-body text-xs text-[#8A93B8] uppercase tracking-wide">
              {locale === "az" ? "Sahə" : locale === "ru" ? "Направления" : "Fields"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


