"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Reorder, useDragControls } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { GripVertical } from "lucide-react";
import DeleteCourseButton from "./DeleteCourseButton";
import DuplicateCourseButton from "./DuplicateCourseButton";

type CourseListItem = {
  id: string;
  slug: string;
  title_en: string;
  price_amount: number | null;
  price_currency: string;
  start_date: string | null;
  is_published: boolean;
  display_order: number;
};

function CourseRow({ course }: { course: CourseListItem }) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item value={course} dragListener={false} dragControls={dragControls}>
      {/* Mobile card — fixed height (h-20) and truncated text, so every
          row is the same size while dragging. Reorder's drop-position
          math assumes roughly uniform item heights; variable-height rows
          (long titles wrapping to 2 lines, etc.) is what made drops land
          in seemingly random places. */}
      <div className="sm:hidden bg-white rounded-xl border border-[#e5e3dc] mb-3 h-20 flex items-center px-4 gap-3">
        <button
          onPointerDown={(e) => dragControls.start(e)}
          className="cursor-grab active:cursor-grabbing text-[#bbb] hover:text-[#888] touch-none shrink-0"
          aria-label="Drag to reorder"
        >
          <GripVertical size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="font-body text-sm font-medium text-[#0B1026] truncate">{course.title_en}</p>
            <span
              className={`font-body text-xs rounded-full px-2 py-0.5 shrink-0 ${
                course.is_published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
              }`}
            >
              {course.is_published ? "Published" : "Draft"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-body text-xs text-[#555] truncate">
              {course.price_amount ? `${course.price_amount} ${course.price_currency}` : "—"}
            </p>
            <Link href={`/admin/courses/${course.id}`} className="font-body text-xs text-[#0B1026] underline shrink-0">
              Edit
            </Link>
            <span className="shrink-0">
              <DuplicateCourseButton courseId={course.id} />
            </span>
            <span className="shrink-0">
              <DeleteCourseButton courseId={course.id} courseTitle={course.title_en} />
            </span>
          </div>
        </div>
      </div>

      {/* Desktop table row — fixed height (h-14), truncated title. */}
      <div className="hidden sm:grid sm:grid-cols-[auto_1fr_140px_140px_120px_auto] sm:items-center bg-white border-b border-[#f0eee8] h-14">
        <div className="px-5">
          <button
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-grab active:cursor-grabbing text-[#bbb] hover:text-[#888] touch-none"
            aria-label="Drag to reorder"
          >
            <GripVertical size={18} />
          </button>
        </div>
        <div className="px-5 font-body text-sm text-[#0B1026] truncate">{course.title_en}</div>
        <div className="px-5 font-body text-sm text-[#555] truncate">
          {course.price_amount ? `${course.price_amount} ${course.price_currency}` : "—"}
        </div>
        <div className="px-5 font-body text-sm text-[#555] truncate">
          {course.start_date
            ? new Date(course.start_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "—"}
        </div>
        <div className="px-5">
          <span
            className={`font-body text-xs rounded-full px-2.5 py-1 ${
              course.is_published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {course.is_published ? "Published" : "Draft"}
          </span>
        </div>
        <div className="px-5 text-right whitespace-nowrap">
          <Link href={`/admin/courses/${course.id}`} className="font-body text-sm text-[#0B1026] underline mr-4">
            Edit
          </Link>
          <span className="mr-4">
            <DuplicateCourseButton courseId={course.id} />
          </span>
          <DeleteCourseButton courseId={course.id} courseTitle={course.title_en} />
        </div>
      </div>
    </Reorder.Item>
  );
}

export default function CoursesList({ initialCourses }: { initialCourses: CourseListItem[] }) {
  const router = useRouter();
  const [orderedCourses, setOrderedCourses] = useState(initialCourses);

  if (
    orderedCourses.length !== initialCourses.length ||
    orderedCourses.some((c, i) => c.id !== initialCourses[i]?.id)
  ) {
    setOrderedCourses(initialCourses);
  }

  async function handleReorder(newOrder: CourseListItem[]) {
    setOrderedCourses(newOrder);
    const supabase = createClient();
    await Promise.all(
      newOrder.map((course, index) =>
        course.display_order === index
          ? null
          : supabase.from("courses").update({ display_order: index }).eq("id", course.id)
      )
    );
    router.refresh();
  }

  if (orderedCourses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#ccc] py-16 text-center">
        <p className="font-body text-sm text-[#888]">No courses yet. Create your first one.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop header row */}
      <div className="hidden sm:grid sm:grid-cols-[auto_1fr_140px_140px_120px_auto] bg-[#f7f6f3] border border-[#e5e3dc] rounded-t-xl">
        <div className="px-5 py-3"></div>
        <div className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Title</div>
        <div className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Price</div>
        <div className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Starts</div>
        <div className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Status</div>
        <div className="px-5 py-3"></div>
      </div>
      <Reorder.Group
        axis="y"
        values={orderedCourses}
        onReorder={handleReorder}
        className="sm:border sm:border-t-0 sm:border-[#e5e3dc] sm:rounded-b-xl sm:overflow-hidden"
      >
        {orderedCourses.map((course) => (
          <CourseRow key={course.id} course={course} />
        ))}
      </Reorder.Group>
    </>
  );
}
