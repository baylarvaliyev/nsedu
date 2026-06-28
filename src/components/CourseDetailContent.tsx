import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnrollmentForm from "@/components/EnrollmentForm";
import SyllabusTimeline from "@/components/SyllabusTimeline";
import RelatedCourses from "@/components/RelatedCourses";
import CourseFaqAccordion from "@/components/CourseFaqAccordion";
import PageAscentBackground from "@/components/PageAscentBackground";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { localized, daysUntil, localizedPath } from "@/lib/locale";

const STARTS_SOON_DAYS = 14;

function startsSoonLabel(days: number, locale: Locale): string {
  if (days === 0) {
    return locale === "az" ? "Bu gün başlayır" : locale === "ru" ? "Старт сегодня" : "Starts today";
  }
  if (locale === "az") return `${days} gün sonra başlayır`;
  if (locale === "ru") return `Старт через ${days} ${days === 1 ? "день" : "дней"}`;
  return `Starts in ${days} ${days === 1 ? "day" : "days"}`;
}

const COURSE_STRINGS = {
  en: { eyebrow: "Course", learn: "What you'll learn", price: "Price", starts: "Starts", duration: "Duration", weeks: "weeks", backTo: "Back to", whoFor: "Who this is for" },
  az: { eyebrow: "Kurs", learn: "Nə öyrənəcəksiniz", price: "Qiymət", starts: "Başlanğıc", duration: "Müddət", weeks: "həftə", backTo: "Geri", whoFor: "Bu kurs kimlər üçündür" },
  ru: { eyebrow: "Курс", learn: "Чему вы научитесь", price: "Цена", starts: "Старт", duration: "Длительность", weeks: "недель", backTo: "Назад к", whoFor: "Для кого этот курс" },
} as const;

export default async function CourseDetailContent({
  slug,
  locale = "en" as Locale,
}: {
  slug: string;
  locale?: Locale;
}) {
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*, categories(id, slug, name_az, name_en, name_ru)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!course) {
    notFound();
  }

  // Other published courses in the same category, excluding this one —
  // for the "related courses" section (#4). Only fetched when a category
  // exists, since uncategorized courses have nothing meaningful to relate to.
  const { data: relatedCourses } = course.category_id
    ? await supabase
        .from("courses")
        .select("id, slug, title_az, title_en, title_ru, price_amount, price_currency, cover_image_url")
        .eq("category_id", course.category_id)
        .eq("is_published", true)
        .neq("id", course.id)
        .limit(3)
    : { data: [] };

  const { data: courseFaq } = await supabase
    .from("course_faq_items")
    .select("*")
    .eq("course_id", course.id)
    .order("display_order");

  const t = COURSE_STRINGS[locale];
  const dateLocale = locale === "ru" ? "ru-RU" : locale === "az" ? "az-AZ" : "en-GB";
  const title = localized(course, "title", locale);
  const description = localized(course, "description", locale);
  const longDescription = localized(course, "long_description", locale);
  const syllabus = localized(course, "syllabus", locale);
  const whoFor = localized(course, "who_for", locale);
  const days = daysUntil(course.start_date);
  const showsStartsSoon = days !== null && days <= STARTS_SOON_DAYS;
  const category = course.categories;
  const categoryName = category ? localized(category, "name", locale) : null;

  return (
    <>
      <PageAscentBackground />
      <Header locale={locale} />
      <main className="relative flex-1 pt-16">
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
          {/* Breadcrumb (#3) */}
          <Link
            href={localizedPath("/courses", locale)}
            className="inline-flex items-center gap-2 font-body text-sm text-[#8A93B8] hover:text-[#F5F3EE] transition-colors mb-6"
          >
            <ArrowLeft size={15} />
            {t.backTo} {categoryName || (locale === "az" ? "Kurslar" : locale === "ru" ? "Курсы" : "Courses")}
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="font-body text-xs uppercase tracking-[0.25em] text-[#8A93B8] mb-3">
                {t.eyebrow}
              </p>
              {course.level && (
                <span className="inline-block mb-3 mr-2 rounded-full bg-[#8A93B8]/15 text-[#8A93B8] text-xs font-body px-3 py-1">
                  {course.level}
                </span>
              )}
              {showsStartsSoon && (
                <span className="inline-block mb-3 rounded-full bg-[#F2C14E] text-[#0B1026] text-xs font-body font-semibold px-3 py-1">
                  {startsSoonLabel(days!, locale)}
                </span>
              )}
              <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-6">
                {title}
              </h1>

              {course.cover_image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={course.cover_image_url}
                  alt={title}
                  className="w-full rounded-2xl mb-8 object-cover max-h-80"
                />
              )}

              {/* Marketing pitch — visually distinct (#6): brighter text,
                  larger, set apart from the structured facts below. */}
              {description && (
                <p className="font-display text-xl text-[#F5F3EE] leading-relaxed mb-8">
                  {description}
                </p>
              )}

              {whoFor && (
                <div className="flex gap-3 rounded-2xl bg-[#F2C14E]/10 border border-[#F2C14E]/20 p-5 mb-8">
                  <Users size={20} className="text-[#F2C14E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display text-base text-[#F5F3EE] mb-1">
                      {t.whoFor}
                    </p>
                    <p className="font-body text-sm text-[#8A93B8] leading-relaxed whitespace-pre-line">
                      {whoFor}
                    </p>
                  </div>
                </div>
              )}

              {longDescription && (
                <div className="rounded-2xl bg-[#0f1530] border border-[#8A93B8]/10 p-6 mb-8">
                  <p className="font-body text-base text-[#8A93B8] leading-relaxed whitespace-pre-line">
                    {longDescription}
                  </p>
                </div>
              )}

              {syllabus && (
                <div className="mb-8">
                  <h2 className="font-display text-xl text-[#F5F3EE] mb-5">
                    {t.learn}
                  </h2>
                  <SyllabusTimeline raw={syllabus} />
                </div>
              )}

              {courseFaq && courseFaq.length > 0 && (
                <CourseFaqAccordion items={courseFaq} locale={locale} />
              )}
            </div>

            {/* Sticky sidebar (#5): stays in view while scrolling the long
                content column, so enrollment is always one click away. */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
              <div className="rounded-2xl bg-[#0f1530] border border-[#8A93B8]/15 p-6">
                <div className="flex items-end justify-between mb-4 pb-4 border-b border-[#8A93B8]/10">
                  {course.price_amount && (
                    <div>
                      <p className="font-body text-xs text-[#8A93B8] mb-1">{t.price}</p>
                      <div className="flex items-baseline gap-2">
                        {course.original_price_amount && course.original_price_amount > course.price_amount && (
                          <p className="font-body text-sm text-[#8A93B8] line-through">
                            {course.original_price_amount} {course.price_currency}
                          </p>
                        )}
                        <p className="font-display text-2xl text-[#F2C14E]">
                          {course.price_amount} {course.price_currency}
                        </p>
                      </div>
                    </div>
                  )}
                  {course.duration_weeks && (
                    <p className="font-body text-xs text-[#8A93B8]">
                      {course.duration_weeks} {t.weeks}
                    </p>
                  )}
                </div>
                {course.start_date && (
                  <div className="mb-4">
                    <p className="font-body text-xs text-[#8A93B8] mb-1">{t.starts}</p>
                    <p className="font-display text-base text-[#F5F3EE]">
                      {new Date(course.start_date).toLocaleDateString(dateLocale, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>

              <EnrollmentForm courseId={course.id} courseTitle={title} locale={locale} />
            </div>
          </div>

          {relatedCourses && relatedCourses.length > 0 && (
            <RelatedCourses courses={relatedCourses} locale={locale} />
          )}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
