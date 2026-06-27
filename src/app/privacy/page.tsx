import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — North Star Academy",
  description: "How North Star Academy collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header locale="en" />
      <main className="flex-1 bg-[#0b1026] pt-16">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
            Legal
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-2">
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-[#8A93B8] mb-10">
            Last updated: June 2026
          </p>

          <div className="font-body text-base text-[#8A93B8] leading-relaxed space-y-6">

            <section>
              <h2 className="font-display text-xl text-[#F5F3EE] mb-3">What we collect</h2>
              <p>
                When you apply for a course, we collect your name, phone number, and email address.
                When you apply for a job posting, we additionally collect your birth year, education
                level, years of experience, and any message you choose to share. If you sign up for
                course updates, we collect only your email address.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[#F5F3EE] mb-3">How we use it</h2>
              <p>
                We use this information to contact you about the course or position you applied for,
                to send you course updates if you&apos;ve subscribed, and to manage our internal
                records of applicants and students. We do not sell your information to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[#F5F3EE] mb-3">Certificates</h2>
              <p>
                If you graduate from a North Star Academy course, we issue a certificate with your
                name and a unique certificate number. This certificate number, together with your
                name, can be used by anyone to verify the certificate&apos;s authenticity on our
                website. We do not display a public list of graduates — verification only confirms
                a specific name and certificate number together.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[#F5F3EE] mb-3">Who can see your information</h2>
              <p>
                Your information is visible only to North Star Academy staff who need it to process
                your application or respond to your inquiry. We use Supabase to store data and
                Web3Forms to deliver email notifications of new applications — both are processors
                acting on our instructions, not independent owners of your data.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[#F5F3EE] mb-3">How long we keep it</h2>
              <p>
                We retain application and enrollment records for as long as needed to manage our
                relationship with you and to maintain certificate verification records. You can
                request that we delete your information at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[#F5F3EE] mb-3">Your rights</h2>
              <p>
                You can ask us what information we hold about you, ask us to correct it, or ask us
                to delete it, subject to our need to retain certificate records for verification
                purposes. To make a request, contact us using the details below.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[#F5F3EE] mb-3">Contact</h2>
              <p>
                For any privacy questions or requests, reach out to us via WhatsApp or the contact
                form on our courses page. We are based in Baku, Azerbaijan.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale="en" />
    </>
  );
}
