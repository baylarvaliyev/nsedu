import CareersIndexContent from "@/components/CareersIndexContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — North Star Academy",
  description: "Open positions at North Star Academy in Baku. Join our team.",
};

export default function CareersIndexPage() {
  return <CareersIndexContent locale="en" />;
}
