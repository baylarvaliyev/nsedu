import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/locale";
import { localized, localizedPath } from "@/lib/locale";

type RelatedCourse = {
  id: string;
  slug: string;
  title_az: string;
  title_en: string;
  title_ru: string;
  price_amount: number | null;
  price_currency: string;
  cover_image_url: string | null;
};

const STRINGS = {
  en: "You might also like",
  az: "Bunlar da maraqlı ola bilər",
  ru: "Вам может понравиться",
} as const;

export default function RelatedCourses({
  courses,
  locale = "en" as Locale,
}: {
  courses: RelatedCourse[];
  locale?: Locale;
}) {
  return (
    <div className="mt-16 pt-12 border-t border-[#8A93B8]/10">
      <h2 className="font-display text-2xl text-[#F5F3EE] mb-6">
        {STRINGS[locale]}
      </h2>
      <div className="grid sm:grid-cols-3 gap-5">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={localizedPath(`/courses/${course.slug}`, locale)}
            className="group rounded-xl border border-[#8A93B8]/15 bg-[#0f1530] overflow-hidden hover:border-[#F2C14E]/40 transition-colors"
          >
            {course.cover_image_url && (
              <div className="relative w-full aspect-[1000/380]">
                <Image
                  src={course.cover_image_url}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <p className="font-display text-base text-[#F5F3EE] group-hover:text-[#F2C14E] transition-colors mb-1">
                {localized(course, "title", locale)}
              </p>
              {course.price_amount && (
                <p className="font-body text-sm text-[#F2C14E]">
                  {course.price_amount} {course.price_currency}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
