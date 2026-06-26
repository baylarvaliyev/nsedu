import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnrollmentForm from "@/components/EnrollmentForm";
import type { Locale } from "@/lib/locale";
import { localized, daysUntil } from "@/lib/locale";

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
  en: { eyebrow: "Course", learn: "What you'll learn", price: "Price", starts: "Starts", duration: "Duration", weeks: "weeks" },
  az: { eyebrow: "Kurs", learn: "Nə öyrənəcəksiniz", price: "Qiymət", starts: "Başlanğıc", duration: "Müddət", weeks: "həftə" },
  ru: { eyebrow: "Курс", learn: "Чему вы научитесь", price: "Цена", starts: "Старт", duration: "Длительность", weeks: "недель" },
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
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!course) {
    notFound();
  }

  const t = COURSE_STRINGS[locale];
  const dateLocale = locale === "ru" ? "ru-RU" : locale === "az" ? "az-AZ" : "en-GB";
  const title = localized(course, "title", locale);
  const description = localized(course, "description", locale);
  const longDescription = localized(course, "long_description", locale);
  const syllabus = localized(course, "syllabus", locale);
  const days = daysUntil(course.start_date);
  const showsStartsSoon = days !== null && days <= STARTS_SOON_DAYS;

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <div className="max-w-5xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-[#8A93B8] mb-3">
              {t.eyebrow}
            </p>
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

            {description && (
              <p className="font-body text-lg text-[#F5F3EE]/90 leading-relaxed mb-6">
                {description}
              </p>
            )}

            {longDescription && (
              <p className="font-body text-base text-[#8A93B8] leading-relaxed mb-8 whitespace-pre-line">
                {longDescription}
              </p>
            )}

            {syllabus && (
              <div className="mb-8">
                <h2 className="font-display text-xl text-[#F5F3EE] mb-3">
                  {t.learn}
                </h2>
                <p className="font-body text-sm text-[#8A93B8] leading-relaxed whitespace-pre-line">
                  {syllabus}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-6 pt-6 border-t border-[#8A93B8]/10">
              {course.price_amount && (
                <div>
                  <p className="font-body text-xs text-[#8A93B8] mb-1">{t.price}</p>
                  <p className="font-display text-lg text-[#F2C14E]">
                    {course.price_amount} {course.price_currency}
                  </p>
                </div>
              )}
              {course.start_date && (
                <div>
                  <p className="font-body text-xs text-[#8A93B8] mb-1">{t.starts}</p>
                  <p className="font-display text-lg text-[#F5F3EE]">
                    {new Date(course.start_date).toLocaleDateString(dateLocale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
              {course.duration_weeks && (
                <div>
                  <p className="font-body text-xs text-[#8A93B8] mb-1">{t.duration}</p>
                  <p className="font-display text-lg text-[#F5F3EE]">
                    {course.duration_weeks} {t.weeks}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <EnrollmentForm courseId={course.id} courseTitle={title} locale={locale} />
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
