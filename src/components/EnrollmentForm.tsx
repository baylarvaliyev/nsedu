"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// WhatsApp number for North Star Academy enrollment leads.
const WHATSAPP_NUMBER = "994773698929";

// Using the AdsOnUs Web3Forms key/inbox temporarily — separate this into
// its own Web3Forms account + key for North Star Academy when ready.
const WEB3FORMS_ACCESS_KEY = "ef4328e5-9f87-4b48-b570-ade6af479224";

export default function EnrollmentForm({
  courseId,
  courseTitle,
}: {
  courseId: string;
  courseTitle: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim()) {
      setError("Please share your name and phone number.");
      return;
    }

    setSubmitting(true);

    // 1. Save to our own database (always works, even if Web3Forms is down)
    const supabase = createClient();
    const { error: dbError } = await supabase.from("enrollment_leads").insert({
      course_id: courseId,
      full_name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
    });

    if (dbError) {
      setSubmitting(false);
      setError("Something went wrong saving your request. Please try again.");
      return;
    }

    // 2. Also send via Web3Forms so it lands in email immediately
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New North Star Academy lead: ${courseTitle}`,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || "Not provided",
          course: courseTitle,
        }),
      });
    } catch {
      // Email delivery failing shouldn't block the user — the lead is
      // already safely in our database either way.
    }

    setSubmitting(false);
    setDone(true);
  }

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${courseTitle} course at North Star Academy.`
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  if (done) {
    return (
      <div className="rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6 text-center">
        <p className="font-display text-lg text-[#F5F3EE] mb-2">
          Thanks, {name.split(" ")[0]}!
        </p>
        <p className="font-body text-sm text-[#8A93B8] mb-4">
          We've got your request for {courseTitle}. An advisor will reach out
          shortly.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white font-body text-sm font-semibold px-5 py-2.5 hover:bg-[#21bd5b] transition-colors"
        >
          Message us on WhatsApp now
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6"
    >
      <p className="font-display text-lg text-[#F5F3EE] mb-4">
        Apply for {courseTitle}
      </p>

      <div className="flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          type="email"
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
      </div>

      {error && (
        <p className="font-body text-sm text-red-400 mt-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-4 rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm py-2.5 hover:bg-[#f5cd6b] transition-colors disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Request to enroll"}
      </button>
    </form>
  );
}
