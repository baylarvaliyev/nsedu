import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function BlogIndexPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title_en, excerpt_en, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const list = posts ?? [];

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
            Blog
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-12">
            Notes from North Star.
          </h1>

          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#8A93B8]/30 py-16 text-center">
              <p className="font-body text-[#8A93B8]">
                Nothing here yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {list.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block border-b border-[#8A93B8]/10 pb-8 last:border-0"
                >
                  <h2 className="font-display text-2xl text-[#F5F3EE] group-hover:text-[#F2C14E] transition-colors mb-2">
                    {post.title_en}
                  </h2>
                  {post.excerpt_en && (
                    <p className="font-body text-sm text-[#8A93B8] leading-relaxed">
                      {post.excerpt_en}
                    </p>
                  )}
                  {post.published_at && (
                    <p className="font-body text-xs text-[#8A93B8]/60 mt-3">
                      {new Date(post.published_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
