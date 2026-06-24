import { createClient } from "@/lib/supabase/server";

type Course = {
  id: string;
  slug: string;
  title_en: string;
  description_en: string | null;
  cover_image_url: string | null;
  price_amount: number | null;
  price_currency: string;
  start_date: string | null;
  category_id: string | null;
};

export default async function CourseCatalog() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select(
      "id, slug, title_en, description_en, cover_image_url, price_amount, price_currency, start_date, category_id"
    )
    .eq("is_published", true)
    .order("start_date", { ascending: true });

  const list = (courses ?? []) as Course[];

  return (
    <section id="courses" className="bg-[#0b1026] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
          Courses
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-12">
          Find your next step.
        </h2>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#8A93B8]/30 py-16 text-center">
            <p className="font-body text-[#8A93B8]">
              Courses are being added — check back soon, or{" "}
              <a href="#contact" className="text-[#F2C14E] underline">
                talk to an advisor
              </a>{" "}
              about what&apos;s coming up.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((course) => (
              <a
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6 hover:border-[#F2C14E]/40 transition-colors flex flex-col"
              >
                <h3 className="font-display text-xl text-[#F5F3EE] mb-2">
                  {course.title_en}
                </h3>
                {course.description_en && (
                  <p className="font-body text-sm text-[#8A93B8] mb-4 line-clamp-3">
                    {course.description_en}
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#8A93B8]/10">
                  {course.price_amount && (
                    <span className="font-body text-sm font-semibold text-[#F2C14E]">
                      {course.price_amount} {course.price_currency}
                    </span>
                  )}
                  {course.start_date && (
                    <span className="font-body text-xs text-[#8A93B8]">
                      Starts {new Date(course.start_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
