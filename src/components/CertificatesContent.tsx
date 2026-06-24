import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificateVerifier from "@/components/CertificateVerifier";
import type { Locale } from "@/lib/locale";

const CERT_STRINGS = {
  en: {
    eyebrow: "Certificates",
    heading: "Verify a certificate.",
    body: "Every North Star Academy graduate receives a certificate of completion with a unique certificate number. Enter the graduate's name and certificate number below to confirm it's genuine.",
  },
  az: {
    eyebrow: "Sertifikatlar",
    heading: "Sertifikatı yoxla.",
    body: "Hər North Star Academy məzunu unikal nömrəyə malik bitirmə sertifikatı alır. Sertifikatın həqiqiliyini yoxlamaq üçün məzunun adını və sertifikat nömrəsini daxil edin.",
  },
  ru: {
    eyebrow: "Сертификаты",
    heading: "Проверить сертификат.",
    body: "Каждый выпускник North Star Academy получает сертификат об окончании с уникальным номером. Введите имя выпускника и номер сертификата, чтобы убедиться в его подлинности.",
  },
} as const;

export default function CertificatesContent({
  locale = "en" as Locale,
}: {
  locale?: Locale;
}) {
  const t = CERT_STRINGS[locale];

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
            {t.eyebrow}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-6">
            {t.heading}
          </h1>
          <p className="font-body text-base text-[#8A93B8] leading-relaxed mb-10">
            {t.body}
          </p>

          <CertificateVerifier locale={locale} />
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
