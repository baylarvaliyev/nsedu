import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import DeleteBlogPostButton from "@/components/admin/DeleteBlogPostButton";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title_en, is_published, published_at, created_at")
    .order("created_at", { ascending: false });

  const list = posts ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-[#0B1026]">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-full bg-[#0B1026] text-white font-body text-sm font-medium px-4 py-2 hover:bg-[#1a2046] transition-colors"
        >
          <Plus size={16} />
          New post
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#ccc] py-16 text-center">
          <p className="font-body text-sm text-[#888]">No posts yet. Write your first one.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e5e3dc] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f7f6f3] border-b border-[#e5e3dc]">
              <tr>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Title</th>
                <th className="font-body text-xs uppercase tracking-wide text-[#888] px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((post) => (
                <tr key={post.id} className="border-b border-[#f0eee8] last:border-0">
                  <td className="px-5 py-3 font-body text-sm text-[#0B1026]">{post.title_en}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`font-body text-xs rounded-full px-2.5 py-1 ${
                        post.is_published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/blog/${post.id}`} className="font-body text-sm text-[#0B1026] underline mr-4">
                      Edit
                    </Link>
                    <DeleteBlogPostButton postId={post.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
