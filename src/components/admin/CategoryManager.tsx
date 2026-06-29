"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Reorder, useDragControls } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Trash2, Pencil, X, GripVertical } from "lucide-react";
import ImageUpload from "./ImageUpload";

type Category = {
  id: string;
  slug: string;
  name_az: string;
  name_en: string;
  name_ru: string;
  description_az: string | null;
  description_en: string | null;
  description_ru: string | null;
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

const inputClass =
  "w-full rounded-lg border border-[#ddd] px-3 py-2 font-body text-sm text-[#0B1026] focus:outline-none focus:border-[#0B1026]/40";

function CategoryEditRow({ cat }: { cat: Category }) {
  const router = useRouter();
  const [nameEn, setNameEn] = useState(cat.name_en);
  const [nameAz, setNameAz] = useState(cat.name_az);
  const [nameRu, setNameRu] = useState(cat.name_ru);
  const [descEn, setDescEn] = useState(cat.description_en ?? "");
  const [descAz, setDescAz] = useState(cat.description_az ?? "");
  const [descRu, setDescRu] = useState(cat.description_ru ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);
    if (!nameEn.trim() || !nameAz.trim() || !nameRu.trim()) {
      setError("Name is required in all three languages.");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("categories")
      .update({
        name_en: nameEn.trim(),
        name_az: nameAz.trim(),
        name_ru: nameRu.trim(),
        description_en: descEn.trim() || null,
        description_az: descAz.trim() || null,
        description_ru: descRu.trim() || null,
      })
      .eq("id", cat.id);
    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }
    router.refresh();
  }

  return (
    <div className="bg-[#f7f6f3] rounded-lg p-4 mt-3">
      <p className="font-body text-xs text-[#888] mb-2">Cover image</p>
      <div className="mb-4">
        <ImageUpload
          value={cat.cover_image_url}
          onChange={(url) => updateCategoryImageStatic(cat.id, url, router)}
          folder="categories"
        />
      </div>
      <p className="font-body text-xs text-[#888] mb-2">Name</p>
      <div className="grid sm:grid-cols-3 gap-2 mb-3">
        <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="English" className={inputClass} />
        <input value={nameAz} onChange={(e) => setNameAz(e.target.value)} placeholder="Azərbaycan" className={inputClass} />
        <input value={nameRu} onChange={(e) => setNameRu(e.target.value)} placeholder="Русский" className={inputClass} />
      </div>
      <p className="font-body text-xs text-[#888] mb-2">Description (shown on the category page)</p>
      <div className="grid sm:grid-cols-3 gap-2 mb-3">
        <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} placeholder="English" rows={3} className={inputClass} />
        <textarea value={descAz} onChange={(e) => setDescAz(e.target.value)} placeholder="Azərbaycan" rows={3} className={inputClass} />
        <textarea value={descRu} onChange={(e) => setDescRu(e.target.value)} placeholder="Русский" rows={3} className={inputClass} />
      </div>
      {error && <p className="font-body text-sm text-red-600 mb-2">{error}</p>}
      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-4 py-1.5 hover:bg-[#1a2046] transition-colors disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}

async function updateCategoryImageStatic(
  id: string,
  url: string | null,
  router: ReturnType<typeof useRouter>
) {
  const supabase = createClient();
  await supabase.from("categories").update({ cover_image_url: url }).eq("id", id);
  router.refresh();
}

function CategoryRow({
  cat,
  editingId,
  setEditingId,
  handleDelete,
  anyRowEditing,
}: {
  cat: Category;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  handleDelete: (id: string) => void;
  anyRowEditing: boolean;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={cat}
      dragListener={false}
      dragControls={dragControls}
      className="border-b border-[#f0eee8] last:border-0 bg-white"
    >
      {/* Fixed height row (h-16) regardless of content, so every item is
          the same size while dragging — Reorder's drop-position math
          assumes roughly uniform item heights, and the previous version
          (full-size image upload inline, wildly different per row) is
          what caused drops landing in seemingly random places. */}
      <div className="flex items-center justify-between gap-4 px-5 h-16">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onPointerDown={(e) => !anyRowEditing && dragControls.start(e)}
            disabled={anyRowEditing}
            className="cursor-grab active:cursor-grabbing text-[#bbb] hover:text-[#888] touch-none shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Drag to reorder"
          >
            <GripVertical size={18} />
          </button>
          {cat.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cat.cover_image_url}
              alt=""
              className="w-10 h-10 rounded-lg object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-[#f0eee8] shrink-0" />
          )}
          <div className="min-w-0">
            <p className="font-body text-sm text-[#0B1026] truncate">{cat.name_en}</p>
            <p className="font-body text-xs text-[#888] truncate">
              {cat.name_az} · {cat.name_ru}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setEditingId(editingId === cat.id ? null : cat.id)}
            className="text-[#0B1026] hover:text-[#1a2046]"
            aria-label="Edit category"
          >
            {editingId === cat.id ? <X size={16} /> : <Pencil size={16} />}
          </button>
          <button
            onClick={() => handleDelete(cat.id)}
            className="text-red-600 hover:text-red-700"
            aria-label="Delete category"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {editingId === cat.id && <div className="px-5 pb-4">{<CategoryEditRow cat={cat} />}</div>}
    </Reorder.Item>
  );
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
  const [editingId, setEditingId] = useState<string | null>(null);
  // Local copy so dragging can reorder instantly in the UI before the
  // database write (which happens on drop, not on every frame of the drag)
  // has confirmed. Re-synced from props whenever the server data changes
  // (e.g. after add/delete triggers router.refresh()).
  const [orderedCategories, setOrderedCategories] = useState(initialCategories);
  if (
    orderedCategories.length !== initialCategories.length ||
    orderedCategories.some((c, i) => c.id !== initialCategories[i]?.id)
  ) {
    // initialCategories changed identity/order from the server (add,
    // delete, or another tab's edit) — adopt it as the new baseline.
    setOrderedCategories(initialCategories);
  }

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

  async function handleReorder(newOrder: Category[]) {
    setOrderedCategories(newOrder);
    const supabase = createClient();
    // Re-number sequentially to match the new visual order. One update
    // per changed item; cheap since category lists are short.
    await Promise.all(
      newOrder.map((cat, index) =>
        cat.display_order === index
          ? null
          : supabase.from("categories").update({ display_order: index }).eq("id", cat.id)
      )
    );
    router.refresh();
  }

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
          <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="English" className={inputClass} />
          <input value={nameAz} onChange={(e) => setNameAz(e.target.value)} placeholder="Azərbaycan" className={inputClass} />
          <input value={nameRu} onChange={(e) => setNameRu(e.target.value)} placeholder="Русский" className={inputClass} />
        </div>
        {error && <p className="font-body text-sm text-red-600 mb-3">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-5 py-2 hover:bg-[#1a2046] transition-colors disabled:opacity-60"
        >
          {saving ? "Adding..." : "Add category"}
        </button>
      </form>

      {orderedCategories.length === 0 ? (
        <p className="font-body text-sm text-[#888]">No categories yet.</p>
      ) : (
        <Reorder.Group
          axis="y"
          values={orderedCategories}
          onReorder={handleReorder}
          className="bg-white rounded-xl border border-[#e5e3dc] overflow-hidden"
        >
          {orderedCategories.map((cat) => (
            <CategoryRow
              key={cat.id}
              cat={cat}
              editingId={editingId}
              setEditingId={setEditingId}
              handleDelete={handleDelete}
              anyRowEditing={editingId !== null}
            />
          ))}
        </Reorder.Group>
      )}
    </div>
  );
}
