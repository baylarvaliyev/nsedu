"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const APPLICATION_STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "interview_scheduled", label: "Interview Scheduled" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-gray-100 text-gray-700",
  reviewing: "bg-blue-100 text-blue-700",
  interview_scheduled: "bg-[#F2C14E]/20 text-[#0B1026]",
  hired: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ApplicationStatusSelect({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  async function handleChange(newStatus: string) {
    setStatus(newStatus);
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("job_applications")
      .update({ status: newStatus })
      .eq("id", applicationId);
    setSaving(false);

    if (error) {
      setStatus(currentStatus);
      alert("Couldn't update status: " + error.message);
      return;
    }

    router.refresh();
  }

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={saving}
      className={`font-body text-xs rounded-full px-2.5 py-1 border-0 cursor-pointer disabled:opacity-60 ${
        STATUS_COLORS[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {APPLICATION_STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
