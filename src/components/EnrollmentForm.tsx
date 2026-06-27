"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/locale";

// WhatsApp number for North Star Academy enrollment leads.
const WHATSAPP_NUMBER = "994773698929";

// Using the AdsOnUs Web3Forms key/inbox temporarily — separate this into
// its own Web3Forms account + key for North Star Academy when ready.
const WEB3FORMS_ACCESS_KEY = "ef4328e5-9f87-4b48-b570-ade6af479224";

const ENROLL_STRINGS = {
  en: {
    name: "Your name",
    phone: "Phone number",
    email: "Email (optional)",
    apply_for: "Apply for",
    submit: "Request to enroll",
    sending: "Sending...",
    error_required: "Please share your name and phone number.",
    error_db: "Something went wrong saving your request. Please try again.",
    error_rate_limit: "You've already submitted a request recently. Please wait a few minutes before trying again, or message us directly on WhatsApp.",
    thanks: "Thanks",
    confirmed_pre: "We've got your request for",
    confirmed_post: "An advisor will reach out shortly.",
    whatsapp_cta: "Message us on WhatsApp now",
    whatsapp_message: (course: string) =>
      `Hi! I'm interested in the ${course} course at North Star Academy.`,
  },
  az: {
    name: "Adınız",
    phone: "Telefon nömrəsi",
    email: "E-poçt (məcburi deyil)",
    apply_for: "Müraciət et:",
    submit: "Qeydiyyatdan keç",
    sending: "Göndərilir...",
    error_required: "Zəhmət olmasa adınızı və telefon nömrənizi qeyd edin.",
    error_db: "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
    error_rate_limit: "Bu yaxınlarda artıq müraciət göndərmisiniz. Bir neçə dəqiqə sonra yenidən cəhd edin, və ya birbaşa WhatsApp-da bizə yazın.",
    thanks: "Təşəkkürlər",
    confirmed_pre: "Müraciətinizi aldıq:",
    confirmed_post: "Məsləhətçimiz tezliklə sizinlə əlaqə saxlayacaq.",
    whatsapp_cta: "İndi WhatsApp-da yazın",
    whatsapp_message: (course: string) =>
      `Salam! North Star Academy-də ${course} kursu ilə maraqlanıram.`,
  },
  ru: {
    name: "Ваше имя",
    phone: "Номер телефона",
    email: "Email (необязательно)",
    apply_for: "Заявка на",
    submit: "Подать заявку",
    sending: "Отправка...",
    error_required: "Пожалуйста, укажите имя и номер телефона.",
    error_db: "Что-то пошло не так. Попробуйте ещё раз.",
    error_rate_limit: "Вы уже недавно отправляли заявку. Подождите несколько минут и попробуйте снова, или напишите нам прямо в WhatsApp.",
    thanks: "Спасибо",
    confirmed_pre: "Мы получили вашу заявку на",
    confirmed_post: "Консультант скоро с вами свяжется.",
    whatsapp_cta: "Написать в WhatsApp сейчас",
    whatsapp_message: (course: string) =>
      `Здравствуйте! Меня интересует курс ${course} в North Star Academy.`,
  },
} as const;

export default function EnrollmentForm({
  courseId,
  courseTitle,
  locale = "en" as Locale,
}: {
  courseId: string;
  courseTitle: string;
  locale?: Locale;
}) {
  const t = ENROLL_STRINGS[locale];
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
      setError(t.error_required);
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
      // Our Postgres trigger raises a specific message for rate-limited
      // submissions — detect it and show a clearer, more helpful error
      // than the generic fallback.
      const isRateLimited = dbError.message?.toLowerCase().includes("wait a few minutes");
      setError(isRateLimited ? t.error_rate_limit : t.error_db);
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

  const whatsappMessage = encodeURIComponent(t.whatsapp_message(courseTitle));
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  if (done) {
    return (
      <div className="rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6 text-center">
        <p className="font-display text-lg text-[#F5F3EE] mb-2">
          {t.thanks}, {name.split(" ")[0]}!
        </p>
        <p className="font-body text-sm text-[#8A93B8] mb-4">
          {t.confirmed_pre} {courseTitle}. {t.confirmed_post}
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white font-body text-sm font-semibold px-5 py-2.5 hover:bg-[#21bd5b] transition-colors"
        >
          {t.whatsapp_cta}
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
        {t.apply_for} {courseTitle}
      </p>

      <div className="flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.name}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.phone}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.email}
          type="email"
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
      </div>

      {error && (
        <p className="font-body text-sm text-red-400 mt-3">{error}</p>
      )}

      <p className="font-body text-xs text-[#8A93B8]/70 mt-3">
        {locale === "az"
          ? "Göndərməklə, "
          : locale === "ru"
          ? "Отправляя форму, вы соглашаетесь с нашей "
          : "By submitting, you agree to our "}
        <a href="/privacy" className="underline hover:text-[#F5F3EE]">
          {locale === "az" ? "Məxfilik Siyasətimizlə" : locale === "ru" ? "Политикой конфиденциальности" : "Privacy Policy"}
        </a>
        {locale === "az" ? " razılaşırsınız." : "."}
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-3 rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm py-2.5 hover:bg-[#f5cd6b] transition-colors disabled:opacity-60"
      >
        {submitting ? t.sending : t.submit}
      </button>
    </form>
  );
}
