import Image from "next/image";
import type { Locale } from "@/lib/locale";
import { localized, localizedPath } from "@/lib/locale";

type FeaturedCourse = {
  id: string;
  slug: string;
  title_az: string;
  title_en: string;
  title_ru: string;
  description_az: string | null;
  description_en: string | null;
  description_ru: string | null;
  cover_image_url: string | null;
  price_amount: number | null;
  original_price_amount: number | null;
  price_currency: string;
};

const STRINGS = {
  en: { eyebrow: "Featured", heading: "Our flagship programs.", cta: "View program" },
  az: { eyebrow: "Seçilmiş", heading: "Əsas proqramlarımız.", cta: "Proqrama bax" },
  ru: { eyebrow: "Избранное", heading: "Наши флагманские программы.", cta: "Смотреть программу" },
} as const;

export default function FeaturedPrograms({
  courses,
  locale = "en" as Locale,
}: {
  courses: FeaturedCourse[];
  locale?: Locale;
}) {
  if (courses.length === 0) return null;
  const t = STRINGS[locale];

  return (
    <section className="relative z-10 bg-[#0b1026] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
          {t.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-10">
          {t.heading}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {courses.map((course) => {
            const title = localized(course, "title", locale);
            const description = localized(course, "description", locale);
            return (
              <a
                key={course.id}
                href={localizedPath(`/courses/${course.slug}`, locale)}
                className="group relative rounded-2xl border-2 border-[#F2C14E]/50 bg-[#0f1530] overflow-hidden hover:border-[#F2C14E] active:border-[#F2C14E] active:bg-[#1a2046] transition-all duration-150 flex flex-col"
              >
                {course.cover_image_url && (
                  <div className="relative w-full aspect-[1000/380]">
                    <Image
                      src={course.cover_image_url}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-display text-2xl text-[#F5F3EE] group-hover:text-[#F2C14E] transition-colors mb-3">
                    {title}
                  </h3>
                  {description && (
                    <p className="font-body text-base text-[#8A93B8] mb-6 line-clamp-3">
                      {description}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#8A93B8]/10">
                    {course.price_amount && (
                      <span className="flex items-baseline gap-2">
                        {course.original_price_amount && course.original_price_amount > course.price_amount && (
                          <span className="font-body text-sm text-[#8A93B8] line-through">
                            {course.original_price_amount} {course.price_currency}
                          </span>
                        )}
                        <span className="font-body text-lg font-semibold text-[#F2C14E]">
                          {course.price_amount} {course.price_currency}
                        </span>
                      </span>
                    )}
                    <span className="font-body text-sm text-[#F2C14E] group-hover:underline">
                      {t.cta} →
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
