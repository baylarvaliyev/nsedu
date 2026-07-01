"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/locale";

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
    <section className="relative z-10 pt-32 pb-12 px-6">
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

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/career-calculator"
            className="inline-flex items-center gap-2 font-body text-sm text-[#8A93B8] hover:text-[#F2C14E] transition-colors border border-[#8A93B8]/20 hover:border-[#F2C14E]/40 rounded-full px-5 py-2.5 active:scale-95"
          >
            <span>✦</span>
            {locale === "az" ? "Karyera kalkulyatoru" : locale === "ru" ? "Калькулятор карьеры" : "Career Calculator"} →
          </Link>
          <Link
            href="/course-quiz"
            className="inline-flex items-center gap-2 font-body text-sm text-[#8A93B8] hover:text-[#F2C14E] transition-colors border border-[#8A93B8]/20 hover:border-[#F2C14E]/40 rounded-full px-5 py-2.5 active:scale-95"
          >
            <span>✦</span>
            {locale === "az" ? "Mənə uyğun kursu tap" : locale === "ru" ? "Подобрать курс" : "Find the right course"} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
