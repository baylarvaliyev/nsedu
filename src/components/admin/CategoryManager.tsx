"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

type Category = {
  id: string;
  slug: string;
  name_az: string;
  name_en: string;
  name_ru: string;
  display_order: number;
  cover_image_url: string | null;
};

function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CategoryManager({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const router = useRouter();
  const [nameEn, setNameEn] = useState("");
  const [nameAz, setNameAz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!nameEn.trim() || !nameAz.trim() || !nameRu.trim()) {
      setError("Please fill in the category name for all three languages.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const slug = sanitizeSlug(nameEn);
    const nextOrder =
      initialCategories.length > 0
        ? Math.max(...initialCategories.map((c) => c.display_order)) + 1
        : 0;

    const { error: insertError } = await supabase.from("categories").insert({
      slug,
      name_en: nameEn.trim(),
      name_az: nameAz.trim(),
      name_ru: nameRu.trim(),
      display_order: nextOrder,
    });

    setSaving(false);

    if (insertError) {
      setError(
        insertError.code === "23505"
          ? "A category with that name already exists."
          : insertError.message
      );
      return;
    }

    setNameEn("");
    setNameAz("");
    setNameRu("");
    router.refresh();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this category? Courses using it will keep their other data but lose this category."
    );
    if (!confirmed) return;

    const supabase = createClient();
    await supabase.from("categories").delete().eq("id", id);
    router.refresh();
  }

  async function updateCategoryImage(id: string, url: string | null) {
    const supabase = createClient();
    await supabase.from("categories").update({ cover_image_url: url }).eq("id", id);
    router.refresh();
  }

  const inputClass =
    "w-full rounded-lg border border-[#ddd] px-3 py-2 font-body text-sm text-[#0B1026] focus:outline-none focus:border-[#0B1026]/40";

  return (
    <div className="max-w-2xl">
      <form
        onSubmit={handleAdd}
        className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6"
      >
        <h2 className="font-display text-lg text-[#0B1026] mb-4">
          Add a category
        </h2>
        <div className="grid sm:grid-cols-3 gap-3 mb-3">
          <input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="English"
            className={inputClass}
          />
          <input
            value={nameAz}
            onChange={(e) => setNameAz(e.target.value)}
            placeholder="Azərbaycan"
            className={inputClass}
          />
          <input
            value={nameRu}
            onChange={(e) => setNameRu(e.target.value)}
            placeholder="Русский"
            className={inputClass}
          />
        </div>
        {error && (
          <p className="font-body text-sm text-red-600 mb-3">{error}</p>
        )}
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-5 py-2 hover:bg-[#1a2046] transition-colors disabled:opacity-60"
        >
          {saving ? "Adding..." : "Add category"}
        </button>
      </form>

      {initialCategories.length === 0 ? (
        <p className="font-body text-sm text-[#888]">No categories yet.</p>
      ) : (
        <div className="bg-white rounded-xl border border-[#e5e3dc] overflow-hidden">
          {initialCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-start justify-between px-5 py-4 border-b border-[#f0eee8] last:border-0 gap-4"
            >
              <div className="flex-1">
                <p className="font-body text-sm text-[#0B1026]">
                  {cat.name_en}
                </p>
                <p className="font-body text-xs text-[#888] mb-3">
                  {cat.name_az} · {cat.name_ru}
                </p>
                <ImageUpload
                  value={cat.cover_image_url}
                  onChange={(url) => updateCategoryImage(cat.id, url)}
                  folder="categories"
                />
              </div>
              <button
                onClick={() => handleDelete(cat.id)}
                className="text-red-600 hover:text-red-700 shrink-0"
                aria-label="Delete category"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
