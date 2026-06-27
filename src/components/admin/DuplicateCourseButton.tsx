"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Copy } from "lucide-react";

export default function DuplicateCourseButton({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [duplicating, setDuplicating] = useState(false);

  async function handleDuplicate() {
    setDuplicating(true);
    const supabase = createClient();

    const { data: original, error: fetchError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single();

    if (fetchError || !original) {
      setDuplicating(false);
      alert("Couldn't load the course to duplicate.");
      return;
    }

    // Strip fields that must be unique or are auto-generated, give the
    // copy an obvious "(Copy)" suffix and a fresh, non-colliding slug,
    // and default it to unpublished so it doesn't go live by accident.
    const { id, created_at, updated_at, slug, title_en, title_az, title_ru, ...rest } = original;

    const newSlug = `${slug}-copy-${Date.now().toString(36)}`;

    const { data: created, error: insertError } = await supabase
      .from("courses")
      .insert({
        ...rest,
        slug: newSlug,
        title_en: `${title_en} (Copy)`,
        title_az: `${title_az} (Copy)`,
        title_ru: `${title_ru} (Копия)`,
        is_published: false,
      })
      .select("id")
      .single();

    setDuplicating(false);

    if (insertError || !created) {
      alert("Couldn't duplicate the course: " + (insertError?.message || "unknown error"));
      return;
    }

    router.push(`/admin/courses/${created.id}`);
  }

  return (
    <button
      onClick={handleDuplicate}
      disabled={duplicating}
      className="font-body text-sm text-[#0B1026] underline inline-flex items-center gap-1 disabled:opacity-50"
      title="Duplicate this course"
    >
      <Copy size={13} />
      {duplicating ? "Copying..." : "Duplicate"}
    </button>
  );
}
