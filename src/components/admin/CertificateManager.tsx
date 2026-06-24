"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Certificate = {
  id: string;
  certificate_number: string;
  first_name: string;
  last_name: string;
  course_title_snapshot: string | null;
  issue_date: string;
  is_valid: boolean;
};

type CourseOption = { id: string; title_en: string };

const inputClass =
  "w-full rounded-lg border border-[#ddd] px-3 py-2 font-body text-sm text-[#0B1026] focus:outline-none focus:border-[#0B1026]/40";

function generateCertificateNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit
  return `NSA-${year}-${random}`;
}

export default function CertificateManager({
  initialCertificates,
  courses,
}: {
  initialCertificates: Certificate[];
  courses: CourseOption[];
}) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [certNumber, setCertNumber] = useState(generateCertificateNumber());
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleIssue(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim() || !certNumber.trim()) {
      setError("Please fill in first name, last name, and certificate number.");
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const selectedCourse = courses.find((c) => c.id === courseId);

    const { error: insertError } = await supabase.from("certificates").insert({
      certificate_number: certNumber.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      course_id: courseId || null,
      course_title_snapshot: selectedCourse?.title_en ?? null,
      issue_date: issueDate,
    });

    setSaving(false);

    if (insertError) {
      if (insertError.code === "23505") {
        setError(
          "That certificate number is already in use — generating a new one."
        );
        setCertNumber(generateCertificateNumber());
      } else {
        setError(insertError.message);
      }
      return;
    }

    setFirstName("");
    setLastName("");
    setCourseId("");
    setCertNumber(generateCertificateNumber());
    router.refresh();
  }

  async function handleToggleValid(cert: Certificate) {
    const supabase = createClient();
    await supabase
      .from("certificates")
      .update({ is_valid: !cert.is_valid })
      .eq("id", cert.id);
    router.refresh();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this certificate record permanently? Prefer revoking instead if you just want to invalidate it."
    );
    if (!confirmed) return;
    const supabase = createClient();
    await supabase.from("certificates").delete().eq("id", id);
    router.refresh();
  }

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleIssue} className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-4">Issue a certificate</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-body text-xs text-[#888] block mb-1">First name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="font-body text-xs text-[#888] block mb-1">Last name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="font-body text-xs text-[#888] block mb-1">Course</label>
            <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className={inputClass}>
              <option value="">No course selected</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title_en}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-body text-xs text-[#888] block mb-1">Issue date</label>
            <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="font-body text-xs text-[#888] block mb-1">Certificate number</label>
            <input value={certNumber} onChange={(e) => setCertNumber(e.target.value)} className={inputClass} />
          </div>
        </div>

        {error && <p className="font-body text-sm text-red-600 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-5 py-2 hover:bg-[#1a2046] transition-colors disabled:opacity-60"
        >
          {saving ? "Issuing..." : "Issue certificate"}
        </button>
      </form>

      {initialCertificates.length === 0 ? (
        <p className="font-body text-sm text-[#888]">No certificates issued yet.</p>
      ) : (
        <div className="bg-white rounded-xl border border-[#e5e3dc] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f7f6f3] border-b border-[#e5e3dc]">
              <tr>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Number</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Name</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Course</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {initialCertificates.map((cert) => (
                <tr key={cert.id} className="border-b border-[#f0eee8] last:border-0">
                  <td className="px-5 py-3 font-body text-sm text-[#0B1026] font-mono">{cert.certificate_number}</td>
                  <td className="px-5 py-3 font-body text-sm text-[#0B1026]">
                    {cert.first_name} {cert.last_name}
                  </td>
                  <td className="px-5 py-3 font-body text-sm text-[#555]">
                    {cert.course_title_snapshot || "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`font-body text-xs rounded-full px-2.5 py-1 ${cert.is_valid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {cert.is_valid ? "Valid" : "Revoked"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => handleToggleValid(cert)} className="font-body text-sm text-[#0B1026] underline mr-4">
                      {cert.is_valid ? "Revoke" : "Restore"}
                    </button>
                    <button onClick={() => handleDelete(cert.id)} className="font-body text-sm text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
