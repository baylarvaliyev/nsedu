"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ComparableCourse = {
  id: string;
  slug: string;
  title_en: string;
  description_en: string | null;
  long_description_en: string | null;
  who_for_en: string | null;
  syllabus_en: string | null;
  price_amount: number | null;
  original_price_amount: number | null;
  price_currency: string;
  duration_weeks: number | null;
  level: string | null;
  cover_image_url: string | null;
};

const ROWS = [
  { key: "duration", label: "Duration" },
  { key: "level", label: "Level" },
  { key: "price", label: "Price" },
  { key: "who_for", label: "Who it's for" },
  { key: "syllabus", label: "What you'll cover" },
] as const;

function getValue(course: ComparableCourse, key: typeof ROWS[number]["key"]): string {
  switch (key) {
    case "duration":
      return course.duration_weeks ? `${course.duration_weeks} weeks` : "—";
    case "level":
      return course.level ?? "Open to all levels";
    case "price":
      if (!course.price_amount) return "Contact us for pricing";
      if (course.original_price_amount && course.original_price_amount > course.price_amount) {
        return `${course.price_amount} ${course.price_currency} (was ${course.original_price_amount})`;
      }
      return `${course.price_amount} ${course.price_currency}`;
    case "who_for":
      return course.who_for_en ?? "—";
    case "syllabus":
      return course.syllabus_en ?? "—";
  }
}

export default function CourseComparison({ courses }: { courses: ComparableCourse[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(s => s !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  }

  const selectedCourses = selected
    .map(id => courses.find(c => c.id === id))
    .filter(Boolean) as ComparableCourse[];

  return (
    <div>
      {/* Course picker */}
      <div className="mb-10">
        <p className="font-body text-sm text-[#8A93B8] mb-4">
          Select up to 2 courses to compare — click to add or remove.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {courses.map(course => {
            const isSelected = selected.includes(course.id);
            return (
              <button
                key={course.id}
                onClick={() => toggle(course.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-150 active:scale-[0.98] ${
                  isSelected
                    ? "border-[#F2C14E] bg-[#F2C14E]/10"
                    : "border-[#8A93B8]/15 bg-[#0f1530] hover:border-[#8A93B8]/40"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className={`font-body text-sm font-medium ${isSelected ? "text-[#F5F3EE]" : "text-[#8A93B8]"}`}>
                    {course.title_en}
                  </p>
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? "border-[#F2C14E] bg-[#F2C14E]" : "border-[#8A93B8]/40"
                  }`}>
                    {isSelected && <span className="text-[#0B1026] text-xs font-bold">✓</span>}
                  </span>
                </div>
                {course.duration_weeks && (
                  <p className="font-body text-xs text-[#8A93B8]">{course.duration_weeks} weeks</p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison table */}
      <AnimatePresence>
        {selectedCourses.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header row with course images/titles */}
            <div className="grid grid-cols-[140px_1fr_1fr] gap-px bg-[#8A93B8]/10 rounded-2xl overflow-hidden mb-px">
              <div className="bg-[#0b1026] p-4" />
              {selectedCourses.map(course => (
                <div key={course.id} className="bg-[#0f1530] p-5">
                  {course.cover_image_url && (
                    <div className="relative w-full aspect-[1000/380] rounded-lg overflow-hidden mb-3">
                      <Image src={course.cover_image_url} alt="" fill sizes="33vw" className="object-cover" />
                    </div>
                  )}
                  <h3 className="font-display text-lg text-[#F5F3EE] mb-1">{course.title_en}</h3>
                  {course.description_en && (
                    <p className="font-body text-xs text-[#8A93B8] line-clamp-2">{course.description_en}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {ROWS.map((row, i) => (
              <div
                key={row.key}
                className={`grid grid-cols-[140px_1fr_1fr] gap-px bg-[#8A93B8]/10 ${
                  i === ROWS.length - 1 ? "rounded-b-2xl overflow-hidden" : ""
                }`}
              >
                <div className="bg-[#0b1026] p-4 flex items-start">
                  <span className="font-body text-xs uppercase tracking-wide text-[#8A93B8] font-semibold">
                    {row.label}
                  </span>
                </div>
                {selectedCourses.map(course => (
                  <div key={course.id} className="bg-[#0f1530] p-5">
                    <p className="font-body text-sm text-[#F5F3EE] leading-relaxed whitespace-pre-line">
                      {getValue(course, row.key)}
                    </p>
                  </div>
                ))}
              </div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-[140px_1fr_1fr] gap-px bg-[#8A93B8]/10 rounded-b-none overflow-hidden mt-px">
              <div className="bg-[#0b1026] p-4" />
              {selectedCourses.map(course => (
                <div key={course.id} className="bg-[#0f1530] p-5">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm px-5 py-2 hover:bg-[#f5cd6b] active:scale-95 transition-all"
                  >
                    View program →
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setSelected([])}
                className="font-body text-sm text-[#8A93B8] hover:text-[#F5F3EE] transition-colors underline"
              >
                Clear comparison
              </button>
            </div>
          </motion.div>
        )}

        {selectedCourses.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 rounded-2xl border border-dashed border-[#8A93B8]/20"
          >
            <p className="font-body text-[#8A93B8]">Select one more course to compare</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
