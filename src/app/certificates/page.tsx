import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificateVerifier from "@/components/CertificateVerifier";

export default function CertificatesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
            Certificates
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-6">
            Verify a certificate.
          </h1>
          <p className="font-body text-base text-[#8A93B8] leading-relaxed mb-10">
            Every North Star Academy graduate receives a certificate of
            completion with a unique certificate number. Enter the
            graduate&apos;s name and certificate number below to confirm it&apos;s
            genuine.
          </p>

          <CertificateVerifier />
        </div>
      </main>
      <Footer />
    </>
  );
}
