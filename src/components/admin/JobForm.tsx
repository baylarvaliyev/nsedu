"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded-lg border border-[#ddd] px-3 py-2 font-body text-sm text-[#0B1026] focus:outline-none focus:border-[#0B1026]/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-body text-xs text-[#888] block mb-1">{label}</span>
      {children}
    </label>
  );
}

function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type JobFormValues = {
  id?: string;
  slug: string;
  title_az: string;
  title_en: string;
  title_ru: string;
  description_az: string;
  description_en: string;
  description_ru: string;
  location: string;
  employment_type: string;
  is_published: boolean;
};

const EMPTY: JobFormValues = {
  slug: "",
  title_az: "",
  title_en: "",
  title_ru: "",
  description_az: "",
  description_en: "",
  description_ru: "",
  location: "",
  employment_type: "",
  is_published: false,
};

export default function JobForm({ initial }: { initial?: Partial<JobFormValues> }) {
  const router = useRouter();
  const [values, setValues] = useState<JobFormValues>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof JobFormValues>(key: K, value: JobFormValues[K]) {
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
      setError("Please fill in the position title for all three languages.");
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const payload = {
      slug,
      title_az: values.title_az.trim(),
      title_en: values.title_en.trim(),
      title_ru: values.title_ru.trim(),
      description_az: values.description_az.trim() || null,
      description_en: values.description_en.trim() || null,
      description_ru: values.description_ru.trim() || null,
      location: values.location.trim() || null,
      employment_type: values.employment_type.trim() || null,
      is_published: values.is_published,
    };

    let saveError;
    if (values.id) {
      const { error } = await supabase.from("job_postings").update(payload).eq("id", values.id);
      saveError = error;
    } else {
      const { error } = await supabase.from("job_postings").insert(payload);
      saveError = error;
    }

    setSaving(false);

    if (saveError) {
      setError(
        saveError.code === "23505"
          ? "That URL slug is already used by another position."
          : saveError.message
      );
      return;
    }

    router.push("/admin/careers");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-4">Title</h2>
        <div className="grid gap-4">
          <Field label="Title (English)">
            <input value={values.title_en} onChange={(e) => update("title_en", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Title (Azərbaycan)">
            <input value={values.title_az} onChange={(e) => update("title_az", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Title (Русский)">
            <input value={values.title_ru} onChange={(e) => update("title_ru", e.target.value)} className={inputClass} />
          </Field>
          <Field label="URL slug (auto-generated from English title if left blank)">
            <input value={values.slug} onChange={(e) => update("slug", e.target.value)} placeholder="data-analyst" className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-4">Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Location">
            <input value={values.location} onChange={(e) => update("location", e.target.value)} placeholder="Baku, Azerbaijan" className={inputClass} />
          </Field>
          <Field label="Employment type">
            <input value={values.employment_type} onChange={(e) => update("employment_type", e.target.value)} placeholder="Full-time" className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-4">Description</h2>
        <div className="grid gap-4">
          <Field label="Description (English)">
            <textarea value={values.description_en} onChange={(e) => update("description_en", e.target.value)} rows={6} className={inputClass} />
          </Field>
          <Field label="Description (Azərbaycan)">
            <textarea value={values.description_az} onChange={(e) => update("description_az", e.target.value)} rows={6} className={inputClass} />
          </Field>
          <Field label="Description (Русский)">
            <textarea value={values.description_ru} onChange={(e) => update("description_ru", e.target.value)} rows={6} className={inputClass} />
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
            Published (visible on the public careers page)
          </span>
        </label>
      </div>

      {error && <p className="font-body text-sm text-red-600 mb-4">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-6 py-2.5 hover:bg-[#1a2046] transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save position"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/careers")}
          className="font-body text-sm text-[#666]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
