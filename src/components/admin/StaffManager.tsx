"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type StaffMember = {
  id: string;
  email: string;
  full_name: string | null;
  role: "owner" | "editor";
  created_at: string;
};

const inputClass =
  "w-full rounded-lg border border-[#ddd] px-3 py-2 font-body text-sm text-[#0B1026] focus:outline-none focus:border-[#0B1026]/40";

export default function StaffManager({ initialStaff }: { initialStaff: StaffMember[] }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"owner" | "editor">("editor");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please provide an email and password.");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/admin/create-staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password, fullName: fullName.trim(), role }),
    });
    const json = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(json.error || "Something went wrong.");
      return;
    }

    setEmail("");
    setPassword("");
    setFullName("");
    setRole("editor");
    router.refresh();
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleAdd} className="bg-white rounded-xl border border-[#e5e3dc] p-6 mb-6">
        <h2 className="font-display text-lg text-[#0B1026] mb-4">Add staff member</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={inputClass}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 8 characters)"
            className={inputClass}
          />
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className={inputClass}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "owner" | "editor")}
            className={inputClass}
          >
            <option value="editor">Editor</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        {error && <p className="font-body text-sm text-red-600 mb-3">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-5 py-2 hover:bg-[#1a2046] transition-colors disabled:opacity-60"
        >
          {saving ? "Adding..." : "Add staff member"}
        </button>
      </form>

      <div className="bg-white rounded-xl border border-[#e5e3dc] overflow-hidden">
        {initialStaff.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between px-5 py-3 border-b border-[#f0eee8] last:border-0"
          >
            <div>
              <p className="font-body text-sm text-[#0B1026]">
                {member.full_name || member.email}
              </p>
              <p className="font-body text-xs text-[#888]">{member.email}</p>
            </div>
            <span
              className={`font-body text-xs rounded-full px-2.5 py-1 ${
                member.role === "owner" ? "bg-[#F2C14E]/20 text-[#0B1026]" : "bg-[#8A93B8]/15 text-[#555]"
              }`}
            >
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
