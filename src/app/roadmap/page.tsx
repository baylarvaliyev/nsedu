import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageAscentBackground from "@/components/PageAscentBackground";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Roadmap — North Star Academy",
  description: "See exactly how our courses build on each other — from first steps to Data Science Bootcamp graduate.",
};

const ANALYTICS_PATH = [
  { step: 1, title: "Excel for Data", description: "How to organise, clean, and think about data before touching any tool.", tag: "Foundation", tagColor: "#60a5fa", slug: null, highlight: false },
  { step: 2, title: "SQL Training", description: "Query real databases directly instead of waiting for someone to send you a spreadsheet.", tag: "Standalone course", tagColor: "#34d399", slug: "sql-telimi", highlight: false },
  { step: 3, title: "Power BI Training", description: "Turn SQL results and spreadsheet data into dashboards leadership will actually use.", tag: "Standalone course", tagColor: "#34d399", slug: "power-bi-telimi", highlight: false },
  { step: 4, title: "Data Analytics with Python", description: "Go deeper than any spreadsheet or BI tool can — automated analysis, custom calculations, charts.", tag: "Standalone course", tagColor: "#34d399", slug: "data-analytics-with-python", highlight: false },
  { step: 5, title: "Data Analytics Bootcamp", description: "All four tools in one structured program, built to take you from zero to job-ready in 20 weeks.", tag: "Full bootcamp", tagColor: "#F2C14E", slug: "data-analitika-bootcamp", highlight: true },
];

const SCIENCE_PATH = [
  { step: 1, title: "SQL + Data Visualization", description: "The foundation — querying data and presenting it clearly before introducing any machine learning.", tag: "Foundation", tagColor: "#60a5fa", slug: null, highlight: false },
  { step: 2, title: "Data Analytics with Python", description: "Python as the core analytical tool — pandas, numpy, plotting. The language everything else is built on.", tag: "Standalone course", tagColor: "#34d399", slug: "data-analytics-with-python", highlight: false },
  { step: 3, title: "Machine Learning", description: "Move from describing data to predicting outcomes — regression, classification, model evaluation.", tag: "Standalone course", tagColor: "#34d399", slug: "machine-learning-telimi", highlight: false },
  { step: 4, title: "Deep Learning", description: "Neural networks, image and text models — where Python meets the frontier of applied AI.", tag: "Standalone course", tagColor: "#34d399", slug: "deep-learning-telimi", highlight: false },
  { step: 5, title: "Generative AI", description: "Large language models, prompting, and building real applications on top of modern AI systems.", tag: "Standalone course", tagColor: "#34d399", slug: "generativ-ai-telimi", highlight: false },
  { step: 6, title: "Data Science Bootcamp", description: "The complete 26-week program — all six topics in a single structured path from foundation to frontier.", tag: "Full bootcamp", tagColor: "#F2C14E", slug: "data-elmi-bootcamp", highlight: true },
];

function PathStep({ step, isLast }: { step: typeof ANALYTICS_PATH[number]; isLast: boolean }) {
  return (
    <div className={`relative flex gap-5 ${isLast ? "" : "pb-8"}`}>
      {!isLast && (
        <div className="absolute left-5 top-10 bottom-0 w-px bg-gradient-to-b from-[#8A93B8]/30 to-transparent" />
      )}
      <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 font-body text-sm font-semibold ${
        step.highlight ? "border-[#F2C14E] bg-[#F2C14E] text-[#0B1026]" : "border-[#8A93B8]/30 bg-[#0b1026] text-[#8A93B8]"
      }`}>
        {step.step}
      </div>
      <div className={`flex-1 rounded-2xl border p-5 ${step.highlight ? "border-[#F2C14E]/50 bg-[#F2C14E]/5" : "border-[#8A93B8]/15 bg-[#0f1530]"}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-lg text-[#F5F3EE]">{step.title}</h3>
          <span className="shrink-0 font-body text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide" style={{ background: `${step.tagColor}18`, color: step.tagColor }}>
            {step.tag}
          </span>
        </div>
        <p className="font-body text-sm text-[#8A93B8] leading-relaxed mb-3">{step.description}</p>
        {step.slug && (
          <Link href={`/courses/${step.slug}`} className="font-body text-xs text-[#F2C14E] hover:underline">
            View course →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <>
      <PageAscentBackground />
      <Header locale="en" />
      <main className="relative flex-1 pt-16">
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          <div className="mb-16 text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">Learning Roadmap</p>
            <h1 className="font-display text-4xl sm:text-5xl text-[#F5F3EE] mb-4">
              How our curriculum<br className="hidden sm:block" /> is structured
            </h1>
            <p className="font-body text-base text-[#8A93B8] max-w-xl mx-auto">
              Every course connects to something larger. Here&apos;s exactly how the individual courses build
              into the two bootcamps — and where you can join either path.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="mb-8">
                <span className="inline-block font-body text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide bg-[#60a5fa]/10 text-[#60a5fa]">Path 1</span>
                <h2 className="font-display text-2xl text-[#F5F3EE] mb-2">Data Analytics</h2>
                <p className="font-body text-sm text-[#8A93B8]">20 weeks → job-ready analyst. Starts from zero, ends at Python.</p>
              </div>
              {ANALYTICS_PATH.map((step, i) => (
                <PathStep key={step.step} step={step} isLast={i === ANALYTICS_PATH.length - 1} />
              ))}
            </div>
            <div>
              <div className="mb-8">
                <span className="inline-block font-body text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide bg-[#34d399]/10 text-[#34d399]">Path 2</span>
                <h2 className="font-display text-2xl text-[#F5F3EE] mb-2">Data Science</h2>
                <p className="font-body text-sm text-[#8A93B8]">26 weeks → machine learning & AI. Builds on analytics foundations.</p>
              </div>
              {SCIENCE_PATH.map((step, i) => (
                <PathStep key={step.step} step={step} isLast={i === SCIENCE_PATH.length - 1} />
              ))}
            </div>
          </div>

          <div className="mt-16 text-center border-t border-[#8A93B8]/10 pt-12">
            <p className="font-body text-base text-[#8A93B8] mb-6">Not sure which path is right for you?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/course-quiz" className="rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm px-6 py-2.5 hover:bg-[#f5cd6b] active:scale-95 transition-all">
                Take the course quiz →
              </Link>
              <Link href="/career-calculator" className="rounded-full border border-[#8A93B8]/30 text-[#F5F3EE] font-body font-medium text-sm px-6 py-2.5 hover:border-[#8A93B8] active:scale-95 transition-all">
                Try the career calculator
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer locale="en" />
    </>
  );
}
