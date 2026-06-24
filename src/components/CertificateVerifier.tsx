"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2, XCircle } from "lucide-react";

type Result = {
  is_valid: boolean;
  first_name: string;
  last_name: string;
  course_title: string | null;
  issue_date: string;
} | null;

export default function CertificateVerifier() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [certNumber, setCertNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setChecked(false);
    setResult(null);

    if (!firstName.trim() || !lastName.trim() || !certNumber.trim()) {
      setError("Please fill in all three fields.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data, error: rpcError } = await supabase.rpc("verify_certificate", {
      p_certificate_number: certNumber.trim(),
      p_first_name: firstName.trim(),
      p_last_name: lastName.trim(),
    });

    setLoading(false);
    setChecked(true);

    if (rpcError) {
      setError("Something went wrong checking that certificate. Please try again.");
      return;
    }

    // The function returns a table — Supabase JS gives back an array.
    const row = Array.isArray(data) && data.length > 0 ? data[0] : null;
    setResult(row);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6 flex flex-col gap-3"
      >
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
          placeholder="Certificate number (e.g. NSA-2026-1234)"
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />

        {error && <p className="font-body text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm py-2.5 hover:bg-[#f5cd6b] transition-colors disabled:opacity-60"
        >
          {loading ? "Checking..." : "Verify certificate"}
        </button>
      </form>

      {checked && (
        <div className="mt-6">
          {result && result.is_valid ? (
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 flex items-start gap-4">
              <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={24} />
              <div>
                <p className="font-display text-lg text-[#F5F3EE] mb-1">
                  This certificate is genuine.
                </p>
                <p className="font-body text-sm text-[#8A93B8]">
                  Issued to {result.first_name} {result.last_name}
                  {result.course_title && ` for ${result.course_title}`} on{" "}
                  {new Date(result.issue_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  .
                </p>
              </div>
            </div>
          ) : result && !result.is_valid ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 flex items-start gap-4">
              <XCircle className="text-amber-400 shrink-0 mt-0.5" size={24} />
              <div>
                <p className="font-display text-lg text-[#F5F3EE] mb-1">
                  This certificate has been revoked.
                </p>
                <p className="font-body text-sm text-[#8A93B8]">
                  This record matched, but is no longer marked as valid.
                  Contact us if you believe this is an error.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 flex items-start gap-4">
              <XCircle className="text-red-400 shrink-0 mt-0.5" size={24} />
              <div>
                <p className="font-display text-lg text-[#F5F3EE] mb-1">
                  We couldn&apos;t verify this certificate.
                </p>
                <p className="font-body text-sm text-[#8A93B8]">
                  Double-check the name and certificate number, or{" "}
                  <a href="#contact" className="text-[#F2C14E] underline">
                    contact us
                  </a>{" "}
                  for help.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
