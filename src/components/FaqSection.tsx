"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { localized } from "@/lib/locale";

type FaqItem = {
  id: string;
  question_az: string;
  question_en: string;
  question_ru: string;
  answer_az: string;
  answer_en: string;
  answer_ru: string;
};

const FAQ_HEADING = {
  en: { eyebrow: "FAQ", heading: "Common questions." },
  az: { eyebrow: "Suallar", heading: "Tez-tez verilən suallar." },
  ru: { eyebrow: "Вопросы", heading: "Частые вопросы." },
} as const;

export default function FaqSection({
  items,
  locale = "en" as Locale,
}: {
  items: FaqItem[];
  locale?: Locale;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const t = FAQ_HEADING[locale];

  if (items.length === 0) return null;

  return (
    <section id="faq" className="relative z-10 py-24 px-6 border-t border-[#8A93B8]/10">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
          {t.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-12">
          {t.heading}
        </h2>

        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const question = localized(item, "question", locale);
            const answer = localized(item, "answer", locale);
            return (
              <div
                key={item.id}
                className="rounded-xl border border-[#8A93B8]/15 bg-[#0f1530] overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-body text-sm font-medium text-[#F5F3EE]">
                    {question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#8A93B8] transition-transform shrink-0 ml-4 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="font-body text-sm text-[#8A93B8] leading-relaxed px-5 pb-4">
                    {answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
