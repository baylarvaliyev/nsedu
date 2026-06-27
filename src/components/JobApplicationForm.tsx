"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/locale";

const APPLY_STRINGS = {
  en: {
    name: "Your name",
    email: "Email",
    phone: "Phone (optional)",
    birth_year: "Birth year",
    education: "Education level",
    education_options: ["High school", "Bachelor's", "Master's", "PhD", "Other"],
    years_experience: "Years of experience",
    relevant_experience: "Relevant experience",
    message: "Anything else you'd like to add (optional)",
    submit: "Submit application",
    sending: "Sending...",
    error_required: "Please share your name and email.",
    error_db: "Something went wrong. Please try again.",
    error_rate_limit: "You've already applied recently with this email. Please wait a few minutes before applying again.",
    thanks: "Thanks",
    confirmed: "We've received your application and will be in touch.",
  },
  az: {
    name: "Adınız",
    email: "E-poçt",
    phone: "Telefon (məcburi deyil)",
    birth_year: "Doğum ili",
    education: "Təhsil səviyyəsi",
    education_options: ["Orta məktəb", "Bakalavr", "Magistr", "Doktorantura", "Digər"],
    years_experience: "İş təcrübəsi (il)",
    relevant_experience: "Uyğun iş təcrübəsi",
    message: "Əlavə qeyd etmək istədiyiniz bir şey (məcburi deyil)",
    submit: "Müraciəti göndər",
    sending: "Göndərilir...",
    error_required: "Zəhmət olmasa adınızı və e-poçtunuzu qeyd edin.",
    error_db: "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
    error_rate_limit: "Bu e-poçtla bu yaxınlarda artıq müraciət etmisiniz. Bir neçə dəqiqə sonra yenidən cəhd edin.",
    thanks: "Təşəkkürlər",
    confirmed: "Müraciətinizi aldıq, sizinlə əlaqə saxlayacağıq.",
  },
  ru: {
    name: "Ваше имя",
    email: "Email",
    phone: "Телефон (необязательно)",
    birth_year: "Год рождения",
    education: "Уровень образования",
    education_options: ["Среднее", "Бакалавр", "Магистр", "Кандидат наук", "Другое"],
    years_experience: "Опыт работы (лет)",
    relevant_experience: "Релевантный опыт работы",
    message: "Что-нибудь ещё, что хотите добавить (необязательно)",
    submit: "Отправить заявку",
    sending: "Отправка...",
    error_required: "Пожалуйста, укажите имя и email.",
    error_db: "Что-то пошло не так. Попробуйте ещё раз.",
    error_rate_limit: "Вы уже недавно подавали заявку с этим email. Подождите несколько минут и попробуйте снова.",
    thanks: "Спасибо",
    confirmed: "Мы получили вашу заявку и свяжемся с вами.",
  },
} as const;

export default function JobApplicationForm({
  jobId,
  jobTitle,
  locale = "en" as Locale,
}: {
  jobId: string;
  jobTitle: string;
  locale?: Locale;
}) {
  const t = APPLY_STRINGS[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [education, setEducation] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [relevantExperience, setRelevantExperience] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError(t.error_required);
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: dbError } = await supabase.from("job_applications").insert({
      job_posting_id: jobId,
      job_title_snapshot: jobTitle,
      full_name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      birth_year: birthYear ? Number(birthYear) : null,
      education_level: education || null,
      years_experience: yearsExperience ? Number(yearsExperience) : null,
      relevant_experience: relevantExperience.trim() || null,
      cover_message: message.trim() || null,
    });

    setSubmitting(false);

    if (dbError) {
      const isRateLimited = dbError.message?.toLowerCase().includes("wait a few minutes");
      setError(isRateLimited ? t.error_rate_limit : t.error_db);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6 text-center">
        <p className="font-display text-lg text-[#F5F3EE] mb-2">{t.thanks}, {name.split(" ")[0]}!</p>
        <p className="font-body text-sm text-[#8A93B8]">{t.confirmed}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6">
      <p className="font-display text-lg text-[#F5F3EE] mb-4">Apply for {jobTitle}</p>
      <div className="flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.name}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={t.email}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.phone}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          type="number"
          placeholder={t.birth_year}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <select
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        >
          <option value="">{t.education}</option>
          {t.education_options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <input
          value={yearsExperience}
          onChange={(e) => setYearsExperience(e.target.value)}
          type="number"
          min="0"
          placeholder={t.years_experience}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <textarea
          value={relevantExperience}
          onChange={(e) => setRelevantExperience(e.target.value)}
          placeholder={t.relevant_experience}
          rows={3}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.message}
          rows={3}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
      </div>

      {error && <p className="font-body text-sm text-red-400 mt-3">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-4 rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm py-2.5 hover:bg-[#f5cd6b] transition-colors disabled:opacity-60"
      >
        {submitting ? t.sending : t.submit}
      </button>
    </form>
  );
}
