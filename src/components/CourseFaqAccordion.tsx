"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { localized } from "@/lib/locale";

type CourseFaqItem = {
  id: string;
  question_az: string;
  question_en: string;
  question_ru: string;
  answer_az: string;
  answer_en: string;
  answer_ru: string;
};

const HEADING = {
  en: "Questions about this course",
  az: "Bu kurs haqqında suallar",
  ru: "Вопросы о курсе",
} as const;

export default function CourseFaqAccordion({
  items,
  locale = "en" as Locale,
}: {
  items: CourseFaqItem[];
  locale?: Locale;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mb-8">
      <h2 className="font-display text-xl text-[#F5F3EE] mb-5">
        {HEADING[locale]}
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const isOpen = openId === item.id;
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
                  {localized(item, "question", locale)}
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
                  {localized(item, "answer", locale)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
