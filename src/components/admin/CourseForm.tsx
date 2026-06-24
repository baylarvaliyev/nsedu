"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Category = { id: string; name_en: string };

const inputClass =
  "w-full rounded-lg border border-[#ddd] px-3 py-2 font-body text-sm text-[#0B1026] focus:outline-none focus:border-[#0B1026]/40";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-body text-xs text-[#888] block mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

export type CourseFormValues = {
  id?: string;
  slug: string;
  category_id: string | null;
  title_az: string;
  title_en: string;
  title_ru: string;
  description_az: string;
  description_en: string;
  description_ru: string;
  long_description_az: string;
  long_description_en: string;
  long_description_ru: string;
  price_amount: string;
  price_currency: string;
  start_date: string;
  duration_weeks: string;
  is_published: boolean;
};

const EMPTY: CourseFormValues = {
  slug: "",
  category_id: null,
  title_az: "",
  title_en: "",
  title_ru: "",
  description_az: "",
  description_en: "",
  description_ru: "",
  long_description_az: "",
  long_description_en: "",
  long_description_ru: "",
  price_amount: "",
  price_currency: "AZN",
  start_date: "",
  duration_weeks: "",
  is_published: false,
};

// Converts arbitrary input into a URL-safe slug: lowercase, hyphens only,
// no leading/trailing/duplicate hyphens. Used so /courses/[slug] always works.
function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CourseForm({
  categories,
  initial,
}: {
  categories: Category[];
  initial?: Partial<CourseFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<CourseFormValues>({
    ...EMPTY,
    ...initial,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof CourseFormValues>(
    key: K,
    value: CourseFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const slug = sanitizeSlug(values.slug || values.title_en);
    if (!slug) {
      setError("Please provide a title or URL slug.");
      return;
    }
    if (!values.title_en.trim() || !values.title_az.trim() || !values.title_ru.trim()) {
      setError("Please fill in the course title for all three languages.");
      return;
    }

    setSaving(true);

    const supabase = createClient();
    const payload = {
      slug,
      category_id: values.category_id || null,
      title_az: values.title_az.trim(),
      title_en: values.title_en.trim(),
      title_ru: values.title_ru.trim(),
      description_az: values.description_az.trim() || null,
      description_en: values.description_en.trim() || null,
      description_ru: values.description_ru.trim() || null,
      long_description_az: values.long_description_az.trim() || null,
      long_description_en: values.long_description_en.trim() || null,
      long_description_ru: values.long_description_ru.trim() || null,
      price_amount: values.price_amount ? Number(values.price_amount) : null,
      price_currency: values.price_currency,
      start_date: values.start_date || null,
      duration_weeks: values.duration_weeks
        ? Number(values.duration_weeks)
        : null,
      is_published: values.is_published,
    };


    let saveError;
    if (values.id) {
      const { error } = await supabase
        .from("courses")
        .update(payload)
        .eq("id", values.id);
      saveError = error;
    } else {
      const { error } = await supabase.from("courses").insert(payload);
      saveError = error;
    }

    setSaving(false);

    if (saveError) {
      if (saveError.code === "23505") {
        setError(
          "That URL slug is already used by another course. Try a different title or slug."
        );
      } else {
        setError(saveError.message);
      }
      return;
    }

    router.push("/admin/courses");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-4">Titles</h2>
        <div className="grid gap-4">
          <Field label="Title (English)">
            <input
              value={values.title_en}
              onChange={(e) => update("title_en", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Title (Azərbaycan)">
            <input
              value={values.title_az}
              onChange={(e) => update("title_az", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Title (Русский)">
            <input
              value={values.title_ru}
              onChange={(e) => update("title_ru", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="URL slug (auto-generated from English title if left blank)">
            <input
              value={values.slug}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="data-science-bootcamp"
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-1">
          Short description
        </h2>
        <p className="font-body text-xs text-[#888] mb-4">
          Shown on the course card in the catalog. Keep it to 1–2 sentences.
        </p>
        <div className="grid gap-4">
          <Field label="Short description (English)">
            <textarea
              value={values.description_en}
              onChange={(e) => update("description_en", e.target.value)}
              rows={2}
              className={inputClass}
            />
          </Field>
          <Field label="Short description (Azərbaycan)">
            <textarea
              value={values.description_az}
              onChange={(e) => update("description_az", e.target.value)}
              rows={2}
              className={inputClass}
            />
          </Field>
          <Field label="Short description (Русский)">
            <textarea
              value={values.description_ru}
              onChange={(e) => update("description_ru", e.target.value)}
              rows={2}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-1">
          Full description
        </h2>
        <p className="font-body text-xs text-[#888] mb-4">
          Shown on the course&apos;s own page. Can be as long as you like.
        </p>
        <div className="grid gap-4">
          <Field label="Full description (English)">
            <textarea
              value={values.long_description_en}
              onChange={(e) => update("long_description_en", e.target.value)}
              rows={6}
              className={inputClass}
            />
          </Field>
          <Field label="Full description (Azərbaycan)">
            <textarea
              value={values.long_description_az}
              onChange={(e) => update("long_description_az", e.target.value)}
              rows={6}
              className={inputClass}
            />
          </Field>
          <Field label="Full description (Русский)">
            <textarea
              value={values.long_description_ru}
              onChange={(e) => update("long_description_ru", e.target.value)}
              rows={6}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-4">Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Category">
            <select
              value={values.category_id ?? ""}
              onChange={(e) => update("category_id", e.target.value || null)}
              className={inputClass}
            >
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_en}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Start date">
            <input
              type="date"
              value={values.start_date}
              onChange={(e) => update("start_date", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Price">
            <input
              type="number"
              min="0"
              step="0.01"
              value={values.price_amount}
              onChange={(e) => update("price_amount", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Currency">
            <select
              value={values.price_currency}
              onChange={(e) => update("price_currency", e.target.value)}
              className={inputClass}
            >
              <option value="AZN">AZN</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </Field>
          <Field label="Duration (weeks)">
            <input
              type="number"
              min="0"
              value={values.duration_weeks}
              onChange={(e) => update("duration_weeks", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={values.is_published}
            onChange={(e) => update("is_published", e.target.checked)}
            className="w-4 h-4"
          />
          <span className="font-body text-sm text-[#0B1026]">
            Published (visible on the public site)
          </span>
        </label>
      </div>

      {error && (
        <p className="font-body text-sm text-red-600 mb-4">{error}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-6 py-2.5 hover:bg-[#1a2046] transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save course"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/courses")}
          className="font-body text-sm text-[#666]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
