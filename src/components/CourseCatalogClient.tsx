"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Course, Category } from "./CourseCatalog";

export default function CourseCatalogClient({
  courses,
  categories,
}: {
  courses: Course[];
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category");

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
    router.push(`/?${params.toString()}#courses`, { scroll: false });
  }

  return (
    <section id="courses" className="bg-[#0b1026] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
          Courses
        </p>

        {showingCourseList ? (
          <>
            <button
              onClick={() => selectCategory(null)}
              className="inline-flex items-center gap-2 font-body text-sm text-[#8A93B8] hover:text-[#F5F3EE] transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              All categories
            </button>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-12">
              {activeCategory ? activeCategory.name_en : "Other courses"}
            </h2>
          </>
        ) : (
          <h2 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-12">
            Find your next step.
          </h2>
        )}

        {!showingCourseList && (
          <>
            {courses.length === 0 ? (
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
                {categories
                  .filter((cat) => (coursesByCategory.get(cat.id) ?? []).length > 0)
                  .map((cat) => {
                    const count = (coursesByCategory.get(cat.id) ?? []).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => selectCategory(cat.slug)}
                        className="group text-left rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6 hover:border-[#F2C14E]/40 transition-colors"
                      >
                        <h3 className="font-display text-xl text-[#F5F3EE] group-hover:text-[#F2C14E] transition-colors mb-2">
                          {cat.name_en}
                        </h3>
                        <p className="font-body text-sm text-[#8A93B8]">
                          {count} {count === 1 ? "course" : "courses"}
                        </p>
                      </button>
                    );
                  })}

                {uncategorizedCourses.length > 0 && (
                  <button
                    onClick={() => selectCategory("__uncategorized")}
                    className="group text-left rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6 hover:border-[#F2C14E]/40 transition-colors"
                  >
                    <h3 className="font-display text-xl text-[#F5F3EE] group-hover:text-[#F2C14E] transition-colors mb-2">
                      Other courses
                    </h3>
                    <p className="font-body text-sm text-[#8A93B8]">
                      {uncategorizedCourses.length}{" "}
                      {uncategorizedCourses.length === 1 ? "course" : "courses"}
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
                  No courses in this category yet.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleCourses.map((course) => (
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
                          Starts{" "}
                          {new Date(course.start_date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
