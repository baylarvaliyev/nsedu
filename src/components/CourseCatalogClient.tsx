"use client";

import { useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { Course, Category } from "./CourseCatalog";
import type { Locale } from "@/lib/locale";
import { localized, localizedPath, daysUntil } from "@/lib/locale";

const STARTS_SOON_DAYS = 14;

function startsSoonLabel(days: number, locale: Locale): string {
  if (days === 0) {
    return locale === "az" ? "Bu gün başlayır" : locale === "ru" ? "Старт сегодня" : "Starts today";
  }
  if (locale === "az") return `${days} gün sonra başlayır`;
  if (locale === "ru") return `Старт через ${days} ${days === 1 ? "день" : "дней"}`;
  return `Starts in ${days} ${days === 1 ? "day" : "days"}`;
}

const CATALOG_STRINGS = {
  en: {
    eyebrow: "Courses",
    heading: "Find your next step.",
    all_categories: "All categories",
    other_courses: "Other courses",
    course_singular: "course",
    course_plural: "courses",
    empty_catalog_pre: "Courses are being added — check back soon, or",
    empty_catalog_link: "talk to an advisor",
    empty_catalog_post: "about what's coming up.",
    empty_category: "No courses in this category yet.",
    starts: "Starts",
  },
  az: {
    eyebrow: "Kurslar",
    heading: "Sizin üçün doğru istiqamət.",
    all_categories: "Bütün kateqoriyalar",
    other_courses: "Digər kurslar",
    course_singular: "kurs",
    course_plural: "kurs",
    empty_catalog_pre: "Yeni kurslar tezliklə əlavə olunacaq. İstədiyiniz sahə haqqında",
    empty_catalog_link: "məsləhətçimizlə əlaqə saxlayın",
    empty_catalog_post: "— sizə kömək etməkdən şad olarıq.",
    empty_category: "Bu kateqoriyada hələ kurs yoxdur.",
    starts: "Başlama tarixi",
  },
  ru: {
    eyebrow: "Курсы",
    heading: "Найди свой следующий шаг.",
    all_categories: "Все категории",
    other_courses: "Другие курсы",
    course_singular: "курс",
    course_plural: "курсов",
    empty_catalog_pre: "Курсы добавляются — загляните позже, или",
    empty_catalog_link: "поговорите с консультантом",
    empty_catalog_post: "о том, что скоро появится.",
    empty_category: "В этой категории пока нет курсов.",
    starts: "Старт",
  },
} as const;

export default function CourseCatalogClient({
  courses,
  categories,
  locale = "en" as Locale,
}: {
  courses: Course[];
  categories: Category[];
  locale?: Locale;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category");
  const t = CATALOG_STRINGS[locale];
  const contactHref = `${localizedPath("/courses", locale)}#contact`;
  const [isPending, startTransition] = useTransition();

  const coursesByCategory = useMemo(() => {
    const map = new Map<string, Course[]>();
    for (const course of courses) {
      const key = course.category_id ?? "uncategorized";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(course);
    }
    return map;
  }, [courses]);

  const activeCategory = categories.find((c) => c.slug === activeSlug);
  const isUncategorizedActive = activeSlug === "__uncategorized";
  const uncategorizedCourses = coursesByCategory.get("uncategorized") ?? [];

  const showingCourseList = Boolean(activeCategory) || isUncategorizedActive;
  const visibleCourses = activeCategory
    ? coursesByCategory.get(activeCategory.id) ?? []
    : isUncategorizedActive
    ? uncategorizedCourses
    : [];

  function selectCategory(slug: string | null) {
    const params = new URLSearchParams(window.location.search);
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    const basePath = localizedPath("/courses", locale);
    // useTransition marks this navigation as a low-priority update React
    // can show pending state for immediately (isPending flips true on the
    // very next paint), instead of the click appearing to do nothing
    // until the URL/state update has fully finished.
    startTransition(() => {
      router.push(`${basePath}?${params.toString()}#courses`, { scroll: false });
    });
  }

  return (
    <section id="courses" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8]">
            {t.eyebrow}
          </p>
          {isPending && (
            <Loader2 size={16} className="text-[#8A93B8] animate-spin" />
          )}
        </div>

        {showingCourseList ? (
          <>
            <button
              onClick={() => selectCategory(null)}
              className="inline-flex items-center gap-2 font-body text-sm text-[#8A93B8] hover:text-[#F5F3EE] transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              {t.all_categories}
            </button>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-4">
              {activeCategory ? localized(activeCategory, "name", locale) : t.other_courses}
            </h2>
            {activeCategory && localized(activeCategory, "description", locale) && (
              <p className="font-body text-base text-[#8A93B8] leading-relaxed mb-12 max-w-2xl">
                {localized(activeCategory, "description", locale)}
              </p>
            )}
            {!(activeCategory && localized(activeCategory, "description", locale)) && (
              <div className="mb-12" />
            )}
          </>
        ) : (
          <h2 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-12">
            {t.heading}
          </h2>
        )}

        {!showingCourseList && (
          <>
            {courses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#8A93B8]/30 py-16 text-center">
                <p className="font-body text-[#8A93B8]">
                  {t.empty_catalog_pre}{" "}
                  <a href={contactHref} className="text-[#F2C14E] underline">
                    {t.empty_catalog_link}
                  </a>{" "}
                  {t.empty_catalog_post}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories
                  .filter((cat) => (coursesByCategory.get(cat.id) ?? []).length > 0)
                  .map((cat, index) => {
                    const count = (coursesByCategory.get(cat.id) ?? []).length;
                    return (
                      <motion.button
                        key={cat.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => selectCategory(cat.slug)}
                        className="group text-left rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] overflow-hidden hover:border-[#F2C14E]/40 transition-colors"
                      >
                        {cat.cover_image_url && (
                          <div className="relative w-full h-36">
                            <Image
                              src={cat.cover_image_url}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="font-display text-xl text-[#F5F3EE] group-hover:text-[#F2C14E] transition-colors mb-2">
                            {localized(cat, "name", locale)}
                          </h3>
                          <p className="font-body text-sm text-[#8A93B8]">
                            {count} {count === 1 ? t.course_singular : t.course_plural}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}

                {uncategorizedCourses.length > 0 && (
                  <button
                    onClick={() => selectCategory("__uncategorized")}
                    className="group text-left rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6 hover:border-[#F2C14E]/40 transition-colors"
                  >
                    <h3 className="font-display text-xl text-[#F5F3EE] group-hover:text-[#F2C14E] transition-colors mb-2">
                      {t.other_courses}
                    </h3>
                    <p className="font-body text-sm text-[#8A93B8]">
                      {uncategorizedCourses.length}{" "}
                      {uncategorizedCourses.length === 1 ? t.course_singular : t.course_plural}
                    </p>
                  </button>
                )}
              </div>
            )}
          </>
        )}


        {showingCourseList && (
          <>
            {visibleCourses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#8A93B8]/30 py-16 text-center">
                <p className="font-body text-[#8A93B8]">
                  {t.empty_category}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleCourses.map((course, index) => {
                  const title = localized(course, "title", locale);
                  const description = localized(course, "description", locale);
                  const days = daysUntil(course.start_date);
                  const showsStartsSoon = days !== null && days <= STARTS_SOON_DAYS;
                  return (
                    <motion.a
                      key={course.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      href={localizedPath(`/courses/${course.slug}`, locale)}
                      className="group relative rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] overflow-hidden hover:border-[#F2C14E]/40 transition-colors flex flex-col"
                    >
                      {showsStartsSoon && (
                        <span className="absolute top-3 right-3 z-10 rounded-full bg-[#F2C14E] text-[#0B1026] text-xs font-body font-semibold px-3 py-1">
                          {startsSoonLabel(days!, locale)}
                        </span>
                      )}
                      {course.cover_image_url && (
                        <div className="relative w-full h-36">
                          <Image
                            src={course.cover_image_url}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        {course.level && (
                          <span className="inline-block w-fit mb-2 rounded-full bg-[#8A93B8]/15 text-[#8A93B8] text-xs font-body px-2.5 py-1">
                            {course.level}
                          </span>
                        )}
                        <h3 className="font-display text-xl text-[#F5F3EE] mb-2">
                          {title}
                        </h3>
                        {description && (
                          <p className="font-body text-sm text-[#8A93B8] mb-4 line-clamp-3">
                            {description}
                          </p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#8A93B8]/10">
                          {course.price_amount && (
                            <span className="flex items-baseline gap-2">
                              {course.original_price_amount && course.original_price_amount > course.price_amount && (
                                <span className="font-body text-xs text-[#8A93B8] line-through">
                                  {course.original_price_amount} {course.price_currency}
                                </span>
                              )}
                              <span className="font-body text-sm font-semibold text-[#F2C14E]">
                                {course.price_amount} {course.price_currency}
                              </span>
                            </span>
                          )}
                          {course.start_date && (
                            <span className="font-body text-xs text-[#8A93B8]">
                              {t.starts}{" "}
                              {new Date(course.start_date).toLocaleDateString(
                                locale === "ru" ? "ru-RU" : locale === "az" ? "az-AZ" : "en-GB",
                                { day: "numeric", month: "short" }
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
