import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnrollmentForm from "@/components/EnrollmentForm";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <div className="max-w-5xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-[#8A93B8] mb-3">
              Course
            </p>
            <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-6">
              {course.title_en}
            </h1>

            {course.description_en && (
              <p className="font-body text-lg text-[#F5F3EE]/90 leading-relaxed mb-6">
                {course.description_en}
              </p>
            )}

            {course.long_description_en && (
              <p className="font-body text-base text-[#8A93B8] leading-relaxed mb-8 whitespace-pre-line">
                {course.long_description_en}
              </p>
            )}

            {course.syllabus_en && (
              <div className="mb-8">
                <h2 className="font-display text-xl text-[#F5F3EE] mb-3">
                  What you&apos;ll learn
                </h2>
                <p className="font-body text-sm text-[#8A93B8] leading-relaxed whitespace-pre-line">
                  {course.syllabus_en}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-6 pt-6 border-t border-[#8A93B8]/10">
              {course.price_amount && (
                <div>
                  <p className="font-body text-xs text-[#8A93B8] mb-1">Price</p>
                  <p className="font-display text-lg text-[#F2C14E]">
                    {course.price_amount} {course.price_currency}
                  </p>
                </div>
              )}
              {course.start_date && (
                <div>
                  <p className="font-body text-xs text-[#8A93B8] mb-1">Starts</p>
                  <p className="font-display text-lg text-[#F5F3EE]">
                    {new Date(course.start_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
              {course.duration_weeks && (
                <div>
                  <p className="font-body text-xs text-[#8A93B8] mb-1">Duration</p>
                  <p className="font-display text-lg text-[#F5F3EE]">
                    {course.duration_weeks} weeks
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <EnrollmentForm courseId={course.id} courseTitle={course.title_en} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
