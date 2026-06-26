import CertificatesContent from "@/components/CertificatesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify a Certificate — North Star Academy",
  description: "Verify the authenticity of a North Star Academy certificate of completion.",
};

export default function CertificatesPage() {
  return <CertificatesContent locale="en" />;
}
