"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteBlogPostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("Delete this post? This can't be undone.");
    if (!confirmed) return;

    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", postId);
    setDeleting(false);

    if (error) {
      alert("Couldn't delete post: " + error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button onClick={handleDelete} disabled={deleting} className="font-body text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
