import CoursesIndexContent from "@/components/CoursesIndexContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses — North Star Academy",
  description:
    "Browse data analytics, language, and professional skills courses at North Star Academy in Baku. Practical training, real results.",
};

export default function CoursesIndexPage() {
  return <CoursesIndexContent locale="en" />;
}
