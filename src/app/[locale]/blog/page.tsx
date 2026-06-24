import BlogIndexContent from "@/components/BlogIndexContent";
import type { Locale } from "@/lib/locale";

export default async function LocaleBlogIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <BlogIndexContent locale={locale} />;
}
