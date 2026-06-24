import { createClient } from "@/lib/supabase/server";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).single();

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-[#0B1026] mb-6">Edit post</h1>
      <BlogForm
        initial={{
          id: post.id,
          slug: post.slug,
          title_az: post.title_az ?? "",
          title_en: post.title_en ?? "",
          title_ru: post.title_ru ?? "",
          excerpt_az: post.excerpt_az ?? "",
          excerpt_en: post.excerpt_en ?? "",
          excerpt_ru: post.excerpt_ru ?? "",
          content_az: post.content_az ?? "",
          content_en: post.content_en ?? "",
          content_ru: post.content_ru ?? "",
          is_published: post.is_published ?? false,
          published_at: post.published_at,
        }}
      />
    </div>
  );
}
