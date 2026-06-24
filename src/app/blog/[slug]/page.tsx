import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <article className="max-w-2xl mx-auto px-6 py-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
            Blog
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-4">
            {post.title_en}
          </h1>
          {post.published_at && (
            <p className="font-body text-xs text-[#8A93B8]/60 mb-8">
              {new Date(post.published_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          {post.content_en && (
            <div className="font-body text-base text-[#8A93B8] leading-relaxed whitespace-pre-line">
              {post.content_en}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
