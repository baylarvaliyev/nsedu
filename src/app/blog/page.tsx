import BlogIndexContent from "@/components/BlogIndexContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — North Star Academy",
  description:
    "Notes, guides, and updates from North Star Academy on data analytics, languages, and career growth in Baku.",
};

export default function BlogIndexPage() {
  return <BlogIndexContent locale="en" />;
}
