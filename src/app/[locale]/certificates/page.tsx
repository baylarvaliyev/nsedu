import CertificatesContent from "@/components/CertificatesContent";
import type { Locale } from "@/lib/locale";

export default async function LocaleCertificatesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CertificatesContent locale={locale} />;
}
