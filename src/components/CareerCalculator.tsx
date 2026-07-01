"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Static data ────────────────────────────────────────────────────────────
// Salary ranges are based on publicly reported Azerbaijani job market data
// (LinkedIn AZ, Glassdoor AZ, local job boards as of 2025-2026).
// We present ranges, not guarantees — North Star Academy teaches skills,
// not job placement.

type Role = {
  title: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  skills: string[];
  seniority: "entry" | "mid" | "senior";
};

type PathResult = {
  headline: string;
  subheadline: string;
  timeframe: string;
  disclaimer: string;
  roles: Role[];
  recommendedCourse: { title: string; slug: string };
};

const BACKGROUNDS = [
  { id: "none", label: "No experience with data" },
  { id: "excel", label: "I use Excel regularly" },
  { id: "analyst", label: "I work in analytics/reporting" },
  { id: "dev", label: "I have some coding experience" },
  { id: "domain", label: "I have a domain (finance, marketing, etc.)" },
] as const;

const GOALS = [
  { id: "new_career", label: "Start a new career in data" },
  { id: "current_role", label: "Use data better in my current role" },
  { id: "freelance", label: "Take on freelance/consulting work" },
  { id: "business", label: "Make better decisions for my own business" },
] as const;

const TIME = [
  { id: "parttime", label: "A few hours a week" },
  { id: "halftime", label: "Around 10 hours a week" },
  { id: "fulltime", label: "I can commit fully" },
] as const;

type BgId = typeof BACKGROUNDS[number]["id"];
type GoalId = typeof GOALS[number]["id"];
type TimeId = typeof TIME[number]["id"];

function getResult(bg: BgId, goal: GoalId, time: TimeId): PathResult {
  const isNewCareer = goal === "new_career" || goal === "freelance";
  const canGoDeep = time === "fulltime" || time === "halftime";
  const hasFoundation = bg === "excel" || bg === "dev" || bg === "analyst";

  if (isNewCareer && canGoDeep) {
    return {
      headline: "Data Science / Analytics career path",
      subheadline: "Roles like these are actively recruited for in Baku and remotely across the region.",
      timeframe: hasFoundation ? "6–12 months of serious study" : "12–18 months of serious study",
      disclaimer: "These salary figures reflect publicly reported ranges on Azerbaijani job boards and LinkedIn AZ as of 2026. Actual compensation varies by employer, experience, and negotiation. North Star Academy teaches the skills — your career outcomes depend on your effort, portfolio, and job search.",
      roles: [
        {
          title: "Data Analyst",
          salaryMin: 1200,
          salaryMax: 2500,
          currency: "AZN/month",
          description: "Works with structured data to produce reports, dashboards, and insights for business decisions. Common in banks, telecoms, retail, and startups.",
          skills: ["SQL", "Excel", "Power BI or Tableau", "Basic Python"],
          seniority: "entry",
        },
        {
          title: "Business Intelligence Analyst",
          salaryMin: 2000,
          salaryMax: 3800,
          currency: "AZN/month",
          description: "Builds and maintains reporting infrastructure, creates automated dashboards, and turns raw data into decision-ready formats for leadership.",
          skills: ["SQL", "Power BI", "Data modeling", "ETL basics"],
          seniority: "mid",
        },
        {
          title: "Data Scientist",
          salaryMin: 3000,
          salaryMax: 6000,
          currency: "AZN/month",
          description: "Builds predictive models, applies machine learning, and works with large or unstructured datasets. Increasingly common in finance, oil & gas, and tech.",
          skills: ["Python", "Machine Learning", "Statistics", "SQL"],
          seniority: "senior",
        },
      ],
      recommendedCourse: { title: "Data Science Bootcamp", slug: "data-elmi-bootcamp" },
    };
  }

  if (goal === "current_role" || goal === "business") {
    return {
      headline: "Applied data skills for your current work",
      subheadline: "These skills are immediately usable — you don't need to change careers to benefit.",
      timeframe: "3–6 months of focused learning",
      disclaimer: "Salary impact from upskilling within a role varies significantly by employer and industry. The figures below reflect general market ranges for roles that require these skills, not guarantees of a pay increase. North Star Academy teaches the skills — what you do with them is up to you.",
      roles: [
        {
          title: "Analyst (upgraded)",
          salaryMin: 1800,
          salaryMax: 3200,
          currency: "AZN/month",
          description: "Adding SQL, Python, or BI tools to an existing role makes you significantly more valuable and often opens the path to a senior title or better salary.",
          skills: ["SQL", "Power BI", "Python basics"],
          seniority: "mid",
        },
        {
          title: "Data-informed Manager",
          salaryMin: 2500,
          salaryMax: 5000,
          currency: "AZN/month",
          description: "Managers who can read data, build their own reports, and challenge vendor numbers are rare and valued across every industry in Azerbaijan.",
          skills: ["Excel advanced", "Power BI", "Basic SQL"],
          seniority: "mid",
        },
      ],
      recommendedCourse: { title: "Data Analytics Bootcamp", slug: "data-analitika-bootcamp" },
    };
  }

  // freelance / part-time
  return {
    headline: "Freelance data consulting path",
    subheadline: "Azerbaijan's SME market has a real shortage of people who can make sense of their data.",
    timeframe: "6–12 months to first client",
    disclaimer: "Freelance income is highly variable and depends on your network, portfolio, and the clients you find. The figures below are illustrative of what experienced freelancers report, not a guarantee. North Star Academy teaches the skills — building a freelance practice is a separate challenge.",
    roles: [
      {
        title: "Freelance Data Analyst",
        salaryMin: 500,
        salaryMax: 2000,
        currency: "AZN/project",
        description: "One-off dashboards, reports, and database cleanups for SMEs. Entry point for freelance work — builds portfolio quickly.",
        skills: ["SQL", "Excel", "Power BI"],
        seniority: "entry",
      },
      {
        title: "BI Consultant",
        salaryMin: 1500,
        salaryMax: 5000,
        currency: "AZN/project",
        description: "Longer-term engagements setting up reporting infrastructure for mid-size businesses. Higher value, needs stronger portfolio.",
        skills: ["Power BI", "SQL", "Data modeling"],
        seniority: "mid",
      },
    ],
    recommendedCourse: { title: "Data Analytics Bootcamp", slug: "data-analitika-bootcamp" },
  };
}

const STEP_LABELS = ["Your background", "Your goal", "Your time", "Your results"];

function StepOption({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border font-body text-sm transition-all duration-150 active:scale-[0.98] ${
        selected
          ? "border-[#F2C14E] bg-[#F2C14E]/10 text-[#F5F3EE]"
          : "border-[#8A93B8]/20 bg-[#0f1530] text-[#8A93B8] hover:border-[#8A93B8]/50 hover:text-[#F5F3EE]"
      }`}
    >
      <span className={`mr-3 inline-block w-4 h-4 rounded-full border-2 flex-shrink-0 align-middle ${
        selected ? "border-[#F2C14E] bg-[#F2C14E]" : "border-[#8A93B8]/40"
      }`} />
      {label}
    </button>
  );
}

function SalaryBar({ role, index }: { role: Role; index: number }) {
  const SENIORITY_COLOR = {
    entry: "#60a5fa",
    mid: "#F2C14E",
    senior: "#34d399",
  };
  const color = SENIORITY_COLOR[role.seniority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="rounded-2xl border border-[#8A93B8]/15 bg-[#0f1530] p-6"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <span
            className="inline-block text-xs font-body font-semibold px-2.5 py-1 rounded-full mb-2 uppercase tracking-wide"
            style={{ background: `${color}20`, color }}
          >
            {role.seniority}
          </span>
          <h3 className="font-display text-xl text-[#F5F3EE]">{role.title}</h3>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-lg text-[#F2C14E]">
            {role.salaryMin.toLocaleString()}–{role.salaryMax.toLocaleString()}
          </p>
          <p className="font-body text-xs text-[#8A93B8]">{role.currency}</p>
        </div>
      </div>
      <p className="font-body text-sm text-[#8A93B8] leading-relaxed mb-4">
        {role.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {role.skills.map((s) => (
          <span key={s} className="font-body text-xs text-[#8A93B8] bg-[#8A93B8]/10 rounded-full px-3 py-1">
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function CareerCalculator() {
  const [step, setStep] = useState(0);
  const [bg, setBg] = useState<BgId | null>(null);
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [time, setTime] = useState<TimeId | null>(null);

  const result = bg && goal && time ? getResult(bg, goal, time) : null;
  const atResults = step === 3 && result;

  const canNext = [bg !== null, goal !== null, time !== null][step] ?? false;

  function next() { if (canNext && step < 3) setStep(s => s + 1); }
  function reset() { setStep(0); setBg(null); setGoal(null); setTime(null); }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step progress */}
      <div className="flex items-center gap-2 mb-10">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-body text-xs font-semibold shrink-0 transition-colors ${
              i < step ? "bg-[#F2C14E] text-[#0B1026]"
              : i === step ? "border-2 border-[#F2C14E] text-[#F2C14E]"
              : "border border-[#8A93B8]/30 text-[#8A93B8]"
            }`}>
              {i < step ? "✓" : i + 1}
            </div>
            {i < 3 && <div className={`h-px flex-1 transition-colors ${i < step ? "bg-[#F2C14E]/40" : "bg-[#8A93B8]/20"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <h2 className="font-display text-2xl text-[#F5F3EE] mb-2">What's your current background?</h2>
            <p className="font-body text-sm text-[#8A93B8] mb-6">Be honest — this helps us show you realistic outcomes, not wishful ones.</p>
            <div className="flex flex-col gap-3">
              {BACKGROUNDS.map(b => <StepOption key={b.id} label={b.label} selected={bg === b.id} onClick={() => setBg(b.id)} />)}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <h2 className="font-display text-2xl text-[#F5F3EE] mb-2">What do you want to achieve?</h2>
            <p className="font-body text-sm text-[#8A93B8] mb-6">There's no wrong answer — different goals lead to different recommendations.</p>
            <div className="flex flex-col gap-3">
              {GOALS.map(g => <StepOption key={g.id} label={g.label} selected={goal === g.id} onClick={() => setGoal(g.id)} />)}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <h2 className="font-display text-2xl text-[#F5F3EE] mb-2">How much time can you commit?</h2>
            <p className="font-body text-sm text-[#8A93B8] mb-6">More time doesn't make you a better student — consistent time does.</p>
            <div className="flex flex-col gap-3">
              {TIME.map(t => <StepOption key={t.id} label={t.label} selected={time === t.id} onClick={() => setTime(t.id)} />)}
            </div>
          </motion.div>
        )}

        {atResults && (
          <motion.div key="results" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <div className="mb-8">
              <h2 className="font-display text-2xl text-[#F5F3EE] mb-1">{result.headline}</h2>
              <p className="font-body text-sm text-[#8A93B8] mb-4">{result.subheadline}</p>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F2C14E]/10 border border-[#F2C14E]/30 px-4 py-2">
                <span className="text-[#F2C14E] text-sm">⏱</span>
                <span className="font-body text-sm text-[#F2C14E]">{result.timeframe}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              {result.roles.map((role, i) => <SalaryBar key={role.title} role={role} index={i} />)}
            </div>

            {/* Honest disclaimer */}
            <div className="rounded-xl bg-[#8A93B8]/8 border border-[#8A93B8]/15 p-5 mb-8">
              <p className="font-body text-xs text-[#8A93B8] leading-relaxed">
                <span className="text-[#F5F3EE] font-semibold">A note on honesty: </span>
                {result.disclaimer}
              </p>
            </div>

            {/* Recommended course CTA */}
            <div className="rounded-2xl border-2 border-[#F2C14E]/40 bg-[#0f1530] p-6 mb-6">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-[#8A93B8] mb-2">Where to start</p>
              <p className="font-display text-xl text-[#F5F3EE] mb-4">
                Based on your answers, we&apos;d recommend the{" "}
                <span className="text-[#F2C14E]">{result.recommendedCourse.title}</span>.
              </p>
              <Link
                href={`/courses/${result.recommendedCourse.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm px-6 py-2.5 hover:bg-[#f5cd6b] active:scale-95 transition-all"
              >
                View program →
              </Link>
            </div>

            <button onClick={reset} className="font-body text-sm text-[#8A93B8] hover:text-[#F5F3EE] transition-colors underline">
              Start over
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {step < 3 && (
        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} className="font-body text-sm text-[#8A93B8] hover:text-[#F5F3EE] transition-colors">
              ← Back
            </button>
          ) : <div />}
          <button
            onClick={next}
            disabled={!canNext}
            className="rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm px-6 py-2.5 hover:bg-[#f5cd6b] active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {step === 2 ? "Show my results →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}
