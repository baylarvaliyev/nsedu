import HomeIntro from "@/components/HomeIntro";
import type { Locale } from "@/lib/locale";

export default function HomePageContent({
  locale = "en" as Locale,
}: {
  locale?: Locale;
}) {
  return (
    <main className="flex-1">
      <HomeIntro locale={locale} />
    </main>
  );
}
