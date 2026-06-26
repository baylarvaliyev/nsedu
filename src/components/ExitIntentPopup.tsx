"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { X } from "lucide-react";
import type { Locale } from "@/lib/locale";

const POPUP_STRINGS = {
  en: {
    heading: "Not ready to apply yet?",
    body: "Leave your email and we'll send you course updates, new cohort dates, and occasional tips — no spam.",
    placeholder: "Your email",
    submit: "Keep me updated",
    sending: "Sending...",
    thanks: "Thanks — you're on the list!",
    error: "Something went wrong. Please try again.",
  },
  az: {
    heading: "Hələ müraciət etməyə hazır deyilsiniz?",
    body: "E-poçtunuzu buraxın, biz sizə kurs yenilikləri, yeni qrup tarixləri və faydalı məsləhətlər göndərək — spam yoxdur.",
    placeholder: "E-poçtunuz",
    submit: "Məni xəbərdar edin",
    sending: "Göndərilir...",
    thanks: "Təşəkkürlər — siyahıya əlavə olundunuz!",
    error: "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
  },
  ru: {
    heading: "Пока не готовы подать заявку?",
    body: "Оставьте email, и мы будем присылать новости о курсах, даты новых групп и полезные советы — без спама.",
    placeholder: "Ваш email",
    submit: "Держите меня в курсе",
    sending: "Отправка...",
    thanks: "Спасибо — вы в списке!",
    error: "Что-то пошло не так. Попробуйте ещё раз.",
  },
} as const;

export default function ExitIntentPopup({ locale = "en" as Locale }: { locale?: Locale }) {
  const t = POPUP_STRINGS[locale];
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("nsa-exit-popup-shown") === "1";
    if (alreadyShown) return;

    function handleMouseLeave(e: MouseEvent) {
      // Only trigger when the cursor exits toward the top of the viewport —
      // the standard exit-intent signal (heading for the tab bar/back button).
      if (e.clientY <= 0) {
        setVisible(true);
        sessionStorage.setItem("nsa-exit-popup-shown", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError(t.error);
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: dbError } = await supabase.from("email_subscribers").insert({
      email: email.trim(),
      source: "exit_intent_popup",
    });
    setSubmitting(false);

    if (dbError && dbError.code !== "23505") {
      // 23505 = already subscribed — treat as success, not an error.
      setError(t.error);
      return;
    }

    setDone(true);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
      <div className="relative max-w-md w-full rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-8">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-[#8A93B8] hover:text-[#F5F3EE]"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {done ? (
          <p className="font-display text-lg text-[#F5F3EE] text-center py-4">{t.thanks}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="font-display text-xl text-[#F5F3EE] mb-2">{t.heading}</p>
            <p className="font-body text-sm text-[#8A93B8] mb-5">{t.body}</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
              className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50 mb-3"
            />
            {error && <p className="font-body text-sm text-red-400 mb-3">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm py-2.5 hover:bg-[#f5cd6b] transition-colors disabled:opacity-60"
            >
              {submitting ? t.sending : t.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
