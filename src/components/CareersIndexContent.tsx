import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { localized, localizedPath } from "@/lib/locale";

const CAREERS_STRINGS = {
  en: { eyebrow: "Careers", heading: "Join our team.", empty: "No open positions right now — check back soon." },
  az: { eyebrow: "Karyera", heading: "Komandamıza qoşulun.", empty: "Hazırda açıq vəzifə yoxdur — tezliklə yoxla." },
  ru: { eyebrow: "Карьера", heading: "Присоединяйтесь к нам.", empty: "Сейчас нет открытых вакансий — загляните позже." },
} as const;

export default async function CareersIndexContent({
  locale = "en" as Locale,
}: {
  locale?: Locale;
}) {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("job_postings")
    .select("id, slug, title_az, title_en, title_ru, location, employment_type")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  const list = jobs ?? [];
  const t = CAREERS_STRINGS[locale];

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
            {t.eyebrow}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-12">
            {t.heading}
          </h1>

          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#8A93B8]/30 py-16 text-center">
              <p className="font-body text-[#8A93B8]">{t.empty}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {list.map((job) => {
                const title = localized(job, "title", locale);
                return (
                  <Link
                    key={job.id}
                    href={localizedPath(`/careers/${job.slug}`, locale)}
                    className="group rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6 hover:border-[#F2C14E]/40 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h2 className="font-display text-xl text-[#F5F3EE] group-hover:text-[#F2C14E] transition-colors mb-1">
                        {title}
                      </h2>
                      <p className="font-body text-sm text-[#8A93B8]">
                        {[job.location, job.employment_type].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
