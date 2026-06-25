import { createClient } from "@/lib/supabase/server";
import JobForm from "@/components/admin/JobForm";
import { notFound } from "next/navigation";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase.from("job_postings").select("*").eq("id", id).single();

  if (!job) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-6">Edit position</h1>
      <JobForm
        initial={{
          id: job.id,
          slug: job.slug,
          title_az: job.title_az ?? "",
          title_en: job.title_en ?? "",
          title_ru: job.title_ru ?? "",
          description_az: job.description_az ?? "",
          description_en: job.description_en ?? "",
          description_ru: job.description_ru ?? "",
          location: job.location ?? "",
          employment_type: job.employment_type ?? "",
          is_published: job.is_published ?? false,
        }}
      />
    </div>
  );
}
