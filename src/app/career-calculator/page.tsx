import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareerCalculator from "@/components/CareerCalculator";
import PageAscentBackground from "@/components/PageAscentBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Calculator — North Star Academy",
  description: "See what data skills could mean for your career in Baku. Explore realistic roles and salary ranges based on your background and goals.",
};

export default function CareerCalculatorPage() {
  return (
    <>
      <PageAscentBackground />
      <Header locale="en" />
      <main className="relative flex-1 pt-16">
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12 text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
              Career Calculator
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-[#F5F3EE] mb-4">
              What could data skills<br className="hidden sm:block" /> mean for your career?
            </h1>
            <p className="font-body text-base text-[#8A93B8] max-w-xl mx-auto">
              Answer three quick questions and we&apos;ll show you realistic roles,
              salary ranges in Baku, and where to start learning — no promises,
              just honest market context.
            </p>
          </div>
          <CareerCalculator />
        </div>
      </main>
      <Footer locale="en" />
    </>
  );
}
