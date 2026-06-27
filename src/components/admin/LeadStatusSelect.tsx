"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const LEAD_STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "called", label: "Called" },
  { value: "interested", label: "Interested" },
  { value: "payment_pending", label: "Payment Pending" },
  { value: "enrolled", label: "Enrolled" },
  { value: "not_interested", label: "Not Interested" },
] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-gray-100 text-gray-700",
  called: "bg-blue-100 text-blue-700",
  interested: "bg-[#F2C14E]/20 text-[#0B1026]",
  payment_pending: "bg-amber-100 text-amber-700",
  enrolled: "bg-green-100 text-green-700",
  not_interested: "bg-red-100 text-red-700",
};

export default function LeadStatusSelect({
  leadId,
  currentStatus,
}: {
  leadId: string;
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
      .from("enrollment_leads")
      .update({ status: newStatus })
      .eq("id", leadId);
    setSaving(false);

    if (error) {
      setStatus(currentStatus); // revert on failure
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
      {LEAD_STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
