"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { logAdminAction } from "@/lib/auditLog";

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

export type BlogFormValues = {
  id?: string;
  slug: string;
  title_az: string;
  title_en: string;
  title_ru: string;
  excerpt_az: string;
  excerpt_en: string;
  excerpt_ru: string;
  content_az: string;
  content_en: string;
  content_ru: string;
  is_published: boolean;
  // The post's stored published_at, if any — used to decide whether a
  // fresh timestamp is needed (only on the unpublished -> published edge).
  published_at?: string | null;
};

const EMPTY: BlogFormValues = {
  slug: "",
  title_az: "",
  title_en: "",
  title_ru: "",
  excerpt_az: "",
  excerpt_en: "",
  excerpt_ru: "",
  content_az: "",
  content_en: "",
  content_ru: "",
  is_published: false,
};

export default function BlogForm({ initial }: { initial?: Partial<BlogFormValues> }) {
  const router = useRouter();
  const [values, setValues] = useState<BlogFormValues>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) {
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
      setError("Please fill in the post title for all three languages.");
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const payload = {
      slug,
      title_az: values.title_az.trim(),
      title_en: values.title_en.trim(),
      title_ru: values.title_ru.trim(),
      excerpt_az: values.excerpt_az.trim() || null,
      excerpt_en: values.excerpt_en.trim() || null,
      excerpt_ru: values.excerpt_ru.trim() || null,
      content_az: values.content_az.trim() || null,
      content_en: values.content_en.trim() || null,
      content_ru: values.content_ru.trim() || null,
      is_published: values.is_published,
    };

    // Only stamp a fresh published_at when actually going live for the
    // first time (was unpublished or never had a date, now publishing).
    // Editing an already-published post never overwrites its original date.
    const isNewlyPublished = values.is_published && !values.published_at;
    const finalPayload = isNewlyPublished
      ? { ...payload, published_at: new Date().toISOString() }
      : payload;

    let saveError;
    if (values.id) {
      const { error } = await supabase
        .from("blog_posts")
        .update(finalPayload)
        .eq("id", values.id);
      saveError = error;
    } else {
      const { error } = await supabase.from("blog_posts").insert(finalPayload);
      saveError = error;
    }

    setSaving(false);

    if (saveError) {
      setError(
        saveError.code === "23505"
          ? "That URL slug is already used by another post."
          : saveError.message
      );
      return;
    }

    logAdminAction({
      action: values.id ? "update" : "create",
      resourceType: "blog_post",
      resourceId: values.id,
      resourceLabel: payload.title_en,
    });

    router.push("/admin/blog");
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
            <input value={values.slug} onChange={(e) => update("slug", e.target.value)} placeholder="my-first-post" className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-1">Excerpt</h2>
        <p className="font-body text-xs text-[#888] mb-4">
          Shown on the blog listing card. 1–2 sentences.
        </p>
        <div className="grid gap-4">
          <Field label="Excerpt (English)">
            <textarea value={values.excerpt_en} onChange={(e) => update("excerpt_en", e.target.value)} rows={2} className={inputClass} />
          </Field>
          <Field label="Excerpt (Azərbaycan)">
            <textarea value={values.excerpt_az} onChange={(e) => update("excerpt_az", e.target.value)} rows={2} className={inputClass} />
          </Field>
          <Field label="Excerpt (Русский)">
            <textarea value={values.excerpt_ru} onChange={(e) => update("excerpt_ru", e.target.value)} rows={2} className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-1">Content</h2>
        <p className="font-body text-xs text-[#888] mb-4">
          The full article body, shown on the post&apos;s own page.
        </p>
        <div className="grid gap-4">
          <Field label="Content (English)">
            <textarea value={values.content_en} onChange={(e) => update("content_en", e.target.value)} rows={10} className={inputClass} />
          </Field>
          <Field label="Content (Azərbaycan)">
            <textarea value={values.content_az} onChange={(e) => update("content_az", e.target.value)} rows={10} className={inputClass} />
          </Field>
          <Field label="Content (Русский)">
            <textarea value={values.content_ru} onChange={(e) => update("content_ru", e.target.value)} rows={10} className={inputClass} />
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

      {error && <p className="font-body text-sm text-red-600 mb-4">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-6 py-2.5 hover:bg-[#1a2046] transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="font-body text-sm text-[#666]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
