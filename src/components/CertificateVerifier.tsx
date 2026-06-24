"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Locale } from "@/lib/locale";

type Result = {
  is_valid: boolean;
  first_name: string;
  last_name: string;
  course_title: string | null;
  issue_date: string;
} | null;

const VERIFY_STRINGS = {
  en: {
    first_name: "First name",
    last_name: "Last name",
    cert_number: "Certificate number (e.g. NSA-2026-1234)",
    error_fields: "Please fill in all three fields.",
    error_generic: "Something went wrong checking that certificate. Please try again.",
    checking: "Checking...",
    submit: "Verify certificate",
    valid_title: "This certificate is genuine.",
    valid_issued_to: "Issued to",
    valid_for: "for",
    valid_on: "on",
    revoked_title: "This certificate has been revoked.",
    revoked_body: "This record matched, but is no longer marked as valid. Contact us if you believe this is an error.",
    not_found_title: "We couldn't verify this certificate.",
    not_found_pre: "Double-check the name and certificate number, or",
    not_found_link: "contact us",
    not_found_post: "for help.",
  },
  az: {
    first_name: "Ad",
    last_name: "Soyad",
    cert_number: "Sertifikat nömrəsi (məs. NSA-2026-1234)",
    error_fields: "Zəhmət olmasa hər üç sahəni doldurun.",
    error_generic: "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
    checking: "Yoxlanılır...",
    submit: "Sertifikatı yoxla",
    valid_title: "Bu sertifikat həqiqidir.",
    valid_issued_to: "Verilib:",
    valid_for: "üçün:",
    valid_on: "tarixdə:",
    revoked_title: "Bu sertifikat ləğv edilib.",
    revoked_body: "Bu qeyd uyğun gəldi, lakin artıq etibarlı sayılmır. Səhv olduğunu düşünürsünüzsə, bizimlə əlaqə saxlayın.",
    not_found_title: "Bu sertifikatı yoxlaya bilmədik.",
    not_found_pre: "Adı və sertifikat nömrəsini yoxlayın, və ya",
    not_found_link: "bizimlə əlaqə saxlayın",
    not_found_post: "kömək üçün.",
  },
  ru: {
    first_name: "Имя",
    last_name: "Фамилия",
    cert_number: "Номер сертификата (напр. NSA-2026-1234)",
    error_fields: "Пожалуйста, заполните все три поля.",
    error_generic: "Что-то пошло не так. Попробуйте ещё раз.",
    checking: "Проверка...",
    submit: "Проверить сертификат",
    valid_title: "Этот сертификат подлинный.",
    valid_issued_to: "Выдан:",
    valid_for: "за курс:",
    valid_on: "дата:",
    revoked_title: "Этот сертификат был отозван.",
    revoked_body: "Запись найдена, но больше не считается действительной. Свяжитесь с нами, если считаете это ошибкой.",
    not_found_title: "Не удалось проверить этот сертификат.",
    not_found_pre: "Проверьте имя и номер сертификата, или",
    not_found_link: "свяжитесь с нами",
    not_found_post: "за помощью.",
  },
} as const;

export default function CertificateVerifier({ locale = "en" as Locale }: { locale?: Locale }) {
  const t = VERIFY_STRINGS[locale];
  const dateLocale = locale === "ru" ? "ru-RU" : locale === "az" ? "az-AZ" : "en-GB";
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
      setError(t.error_fields);
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
      setError(t.error_generic);
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
          placeholder={t.first_name}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder={t.last_name}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />
        <input
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
          placeholder={t.cert_number}
          className="w-full rounded-lg bg-[#0b1026] border border-[#8A93B8]/20 px-3 py-2 text-[#F5F3EE] font-body text-sm focus:outline-none focus:border-[#F2C14E]/50"
        />

        {error && <p className="font-body text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm py-2.5 hover:bg-[#f5cd6b] transition-colors disabled:opacity-60"
        >
          {loading ? t.checking : t.submit}
        </button>
      </form>

      {checked && (
        <div className="mt-6">
          {result && result.is_valid ? (
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 flex items-start gap-4">
              <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={24} />
              <div>
                <p className="font-display text-lg text-[#F5F3EE] mb-1">
                  {t.valid_title}
                </p>
                <p className="font-body text-sm text-[#8A93B8]">
                  {t.valid_issued_to} {result.first_name} {result.last_name}
                  {result.course_title && ` ${t.valid_for} ${result.course_title}`} {t.valid_on}{" "}
                  {new Date(result.issue_date).toLocaleDateString(dateLocale, {
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
                  {t.revoked_title}
                </p>
                <p className="font-body text-sm text-[#8A93B8]">
                  {t.revoked_body}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 flex items-start gap-4">
              <XCircle className="text-red-400 shrink-0 mt-0.5" size={24} />
              <div>
                <p className="font-display text-lg text-[#F5F3EE] mb-1">
                  {t.not_found_title}
                </p>
                <p className="font-body text-sm text-[#8A93B8]">
                  {t.not_found_pre}{" "}
                  <a href="#contact" className="text-[#F2C14E] underline">
                    {t.not_found_link}
                  </a>{" "}
                  {t.not_found_post}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
