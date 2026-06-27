"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";

type CourseFaqItem = {
  id: string;
  question_az: string;
  question_en: string;
  question_ru: string;
  answer_az: string;
  answer_en: string;
  answer_ru: string;
  display_order: number;
};

const inputClass =
  "w-full rounded-lg border border-[#ddd] px-3 py-2 font-body text-sm text-[#0B1026] focus:outline-none focus:border-[#0B1026]/40";

export default function CourseFaqManager({
  courseId,
  initialItems,
}: {
  courseId: string;
  initialItems: CourseFaqItem[];
}) {
  const router = useRouter();
  const [qEn, setQEn] = useState("");
  const [qAz, setQAz] = useState("");
  const [qRu, setQRu] = useState("");
  const [aEn, setAEn] = useState("");
  const [aAz, setAAz] = useState("");
  const [aRu, setARu] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!qEn.trim() || !qAz.trim() || !qRu.trim() || !aEn.trim() || !aAz.trim() || !aRu.trim()) {
      setError("Please fill in both the question and answer for all three languages.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const nextOrder =
      initialItems.length > 0
        ? Math.max(...initialItems.map((i) => i.display_order)) + 1
        : 0;

    const { error: insertError } = await supabase.from("course_faq_items").insert({
      course_id: courseId,
      question_en: qEn.trim(),
      question_az: qAz.trim(),
      question_ru: qRu.trim(),
      answer_en: aEn.trim(),
      answer_az: aAz.trim(),
      answer_ru: aRu.trim(),
      display_order: nextOrder,
    });

    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setQEn(""); setQAz(""); setQRu("");
    setAEn(""); setAAz(""); setARu("");
    router.refresh();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this question?");
    if (!confirmed) return;
    const supabase = createClient();
    await supabase.from("course_faq_items").delete().eq("id", id);
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="bg-[#f7f6f3] rounded-xl border border-[#e5e3dc] p-4 mb-4">
        <p className="font-body text-xs text-[#888] mb-2">Question</p>
        <div className="grid sm:grid-cols-3 gap-2 mb-3">
          <input value={qEn} onChange={(e) => setQEn(e.target.value)} placeholder="English" className={inputClass} />
          <input value={qAz} onChange={(e) => setQAz(e.target.value)} placeholder="Azərbaycan" className={inputClass} />
          <input value={qRu} onChange={(e) => setQRu(e.target.value)} placeholder="Русский" className={inputClass} />
        </div>
        <p className="font-body text-xs text-[#888] mb-2">Answer</p>
        <div className="grid sm:grid-cols-3 gap-2 mb-3">
          <textarea value={aEn} onChange={(e) => setAEn(e.target.value)} placeholder="English" rows={2} className={inputClass} />
          <textarea value={aAz} onChange={(e) => setAAz(e.target.value)} placeholder="Azərbaycan" rows={2} className={inputClass} />
          <textarea value={aRu} onChange={(e) => setARu(e.target.value)} placeholder="Русский" rows={2} className={inputClass} />
        </div>
        {error && <p className="font-body text-sm text-red-600 mb-2">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-4 py-1.5 hover:bg-[#1a2046] transition-colors disabled:opacity-60"
        >
          {saving ? "Adding..." : "Add question"}
        </button>
      </form>

      {initialItems.length > 0 && (
        <div className="bg-white rounded-xl border border-[#e5e3dc] overflow-hidden">
          {initialItems.map((item) => (
            <div key={item.id} className="flex items-start justify-between px-4 py-3 border-b border-[#f0eee8] last:border-0 gap-3">
              <div>
                <p className="font-body text-sm font-medium text-[#0B1026]">{item.question_en}</p>
                <p className="font-body text-xs text-[#888] mt-0.5">{item.answer_en}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 shrink-0" aria-label="Delete question">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
