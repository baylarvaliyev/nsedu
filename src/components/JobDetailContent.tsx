import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobApplicationForm from "@/components/JobApplicationForm";
import type { Locale } from "@/lib/locale";
import { localized } from "@/lib/locale";

const JOB_STRINGS = {
  en: { eyebrow: "Open position" },
  az: { eyebrow: "Açıq vəzifə" },
  ru: { eyebrow: "Открытая вакансия" },
} as const;

export default async function JobDetailContent({
  slug,
  locale = "en" as Locale,
}: {
  slug: string;
  locale?: Locale;
}) {
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("job_postings")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!job) {
    notFound();
  }

  const t = JOB_STRINGS[locale];
  const title = localized(job, "title", locale);
  const description = localized(job, "description", locale);

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <div className="max-w-5xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-[#8A93B8] mb-3">
              {t.eyebrow}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-4">
              {title}
            </h1>
            <p className="font-body text-sm text-[#8A93B8] mb-8">
              {[job.location, job.employment_type].filter(Boolean).join(" · ")}
            </p>

            {description && (
              <p className="font-body text-base text-[#8A93B8] leading-relaxed whitespace-pre-line">
                {description}
              </p>
            )}
          </div>

          <div>
            <JobApplicationForm jobId={job.id} jobTitle={title} locale={locale} />
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
