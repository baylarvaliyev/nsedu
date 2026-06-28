"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ChevronUp, ChevronDown } from "lucide-react";

type CourseOrderItem = { id: string; display_order: number };

export default function CourseReorderButtons({
  courses,
  index,
}: {
  courses: CourseOrderItem[];
  index: number;
}) {
  const router = useRouter();

  async function handleMove(direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= courses.length) return;

    const current = courses[index];
    const target = courses[targetIndex];

    const supabase = createClient();
    await Promise.all([
      supabase.from("courses").update({ display_order: target.display_order }).eq("id", current.id),
      supabase.from("courses").update({ display_order: current.display_order }).eq("id", target.id),
    ]);
    router.refresh();
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={() => handleMove("up")}
        disabled={index === 0}
        className="text-[#888] hover:text-[#0B1026] disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Move up"
      >
        <ChevronUp size={16} />
      </button>
      <button
        onClick={() => handleMove("down")}
        disabled={index === courses.length - 1}
        className="text-[#888] hover:text-[#0B1026] disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Move down"
      >
        <ChevronDown size={16} />
      </button>
    </div>
  );
}
