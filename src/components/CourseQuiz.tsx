"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const QUESTIONS = [
  {
    id: "experience",
    question: "Have you ever written code or used formulas in Excel?",
    options: [
      { id: "none", label: "Never touched either" },
      { id: "excel", label: "Excel yes, coding no" },
      { id: "some_code", label: "A bit of coding, beginner level" },
      { id: "comfortable", label: "I'm comfortable with both" },
    ],
  },
  {
    id: "goal",
    question: "What's driving you to learn right now?",
    options: [
      { id: "job", label: "I want a new job in data" },
      { id: "promotion", label: "I want to grow in my current role" },
      { id: "business", label: "I run a business and want better insights" },
      { id: "curious", label: "I'm curious and want to explore" },
    ],
  },
  {
    id: "time",
    question: "How much time can you realistically commit per week?",
    options: [
      { id: "low", label: "1–4 hours" },
      { id: "medium", label: "5–10 hours" },
      { id: "high", label: "10+ hours, I'm serious about this" },
    ],
  },
  {
    id: "style",
    question: "How do you learn best?",
    options: [
      { id: "structured", label: "Step-by-step, I like knowing exactly what comes next" },
      { id: "project", label: "By building real things and solving real problems" },
      { id: "theory", label: "I like understanding the math/logic behind things" },
    ],
  },
] as const;

type Answers = Record<string, string>;

type Recommendation = {
  title: string;
  slug: string;
  why: string;
  badge: string;
  badgeColor: string;
  alternatives?: { title: string; slug: string; reason: string }[];
};

function getRecommendation(answers: Answers): Recommendation {
  const { experience, goal, time, style } = answers;

  const wantsJob = goal === "job";
  const hasExperience = experience === "comfortable" || experience === "some_code";
  const hasExcel = experience === "excel";
  const canCommit = time === "high" || time === "medium";
  const likesTheory = style === "theory";

  if (wantsJob && canCommit && hasExperience && likesTheory) {
    return {
      title: "Data Science Bootcamp",
      slug: "data-elmi-bootcamp",
      badge: "Best match",
      badgeColor: "#34d399",
      why: "You have the foundation, the commitment, and an appetite for the deeper theory. The Data Science Bootcamp — covering Python, Machine Learning, Deep Learning, and Generative AI — is the right level of challenge for where you are.",
      alternatives: [
        { title: "Machine Learning Training", slug: "machine-learning-telimi", reason: "If you want to go deep on one area first before the full bootcamp." },
      ],
    };
  }

  if (wantsJob && canCommit && (hasExcel || hasExperience)) {
    return {
      title: "Data Analytics Bootcamp",
      slug: "data-analitika-bootcamp",
      badge: "Best match",
      badgeColor: "#34d399",
      why: "You have enough foundation to move fast, and the commitment to go through a full program. The Data Analytics Bootcamp (Excel → SQL → Power BI → Python) will take you from where you are to job-ready in a structured, progressive way.",
      alternatives: [
        { title: "SQL Training", slug: "sql-telimi", reason: "If you want to test the waters with one course before committing to the full bootcamp." },
        { title: "Data Science Bootcamp", slug: "data-elmi-bootcamp", reason: "If you already feel confident with analytics and want to go further into ML." },
      ],
    };
  }

  if (wantsJob && (experience === "none" || !canCommit)) {
    return {
      title: "Data Analytics Bootcamp",
      slug: "data-analitika-bootcamp",
      badge: "Recommended starting point",
      badgeColor: "#F2C14E",
      why: "The Data Analytics Bootcamp is built for people starting from zero. It begins with Excel — something most people already have some exposure to — and builds up progressively to SQL, Power BI, and Python. You don't need prior experience; you need consistency.",
      alternatives: [
        { title: "SQL Training", slug: "sql-telimi", reason: "Start with just SQL if you want to move more slowly and test your commitment first." },
      ],
    };
  }

  if (goal === "business") {
    return {
      title: "Power BI Training",
      slug: "power-bi-telimi",
      badge: "Most practical for your goal",
      badgeColor: "#60a5fa",
      why: "For business owners, the fastest path to useful insights is a reporting tool you can actually use tomorrow. Power BI will let you connect your data, build dashboards, and see what's actually happening in your business — without needing to become a developer.",
      alternatives: [
        { title: "SQL Training", slug: "sql-telimi", reason: "If your data lives in a database and you want to be able to query it directly." },
        { title: "Data Analytics Bootcamp", slug: "data-analitika-bootcamp", reason: "If you want a deeper understanding across multiple tools." },
      ],
    };
  }

  if (goal === "promotion") {
    return {
      title: hasExcel ? "SQL Training" : "Power BI Training",
      slug: hasExcel ? "sql-telimi" : "power-bi-telimi",
      badge: "Best for upskilling",
      badgeColor: "#60a5fa",
      why: hasExcel
        ? "You already use Excel, which means you understand data. SQL will let you go directly to the source — querying databases instead of waiting for someone to send you a spreadsheet. That shift alone makes you significantly more valuable in most roles."
        : "Power BI is the most direct path from 'I present reports in meetings' to 'I build the reports everyone uses.' It's the skill gap most mid-level professionals in Baku have right now.",
      alternatives: [
        { title: "Data Analytics Bootcamp", slug: "data-analitika-bootcamp", reason: "If you want a more comprehensive upgrade rather than one targeted skill." },
      ],
    };
  }

  // curious / exploring
  return {
    title: "Data Analytics with Python",
    slug: "data-analytics-with-python",
    badge: "Great starting point",
    badgeColor: "#a78bfa",
    why: "If you're exploring and not sure yet, Python is the most versatile starting point in the data world. It's used everywhere — analytics, machine learning, automation. Starting here gives you maximum optionality for wherever your curiosity takes you next.",
    alternatives: [
      { title: "SQL Training", slug: "sql-telimi", reason: "If you'd prefer something more immediately practical and less abstract." },
      { title: "Data Analytics Bootcamp", slug: "data-analitika-bootcamp", reason: "If you decide you want a full structured path rather than exploring one course at a time." },
    ],
  };
}

function OptionButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border font-body text-sm transition-all duration-150 active:scale-[0.98] ${
        selected
          ? "border-[#F2C14E] bg-[#F2C14E]/10 text-[#F5F3EE]"
          : "border-[#8A93B8]/20 bg-[#0f1530] text-[#8A93B8] hover:border-[#8A93B8]/50 hover:text-[#F5F3EE]"
      }`}
    >
      <span className={`mr-3 inline-block w-4 h-4 rounded-full border-2 shrink-0 align-middle transition-colors ${
        selected ? "border-[#F2C14E] bg-[#F2C14E]" : "border-[#8A93B8]/40"
      }`} />
      {label}
    </button>
  );
}

export default function CourseQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const current = QUESTIONS[step];
  const currentAnswer = current ? answers[current.id] : null;
  const isDone = step >= QUESTIONS.length;
  const result = isDone ? getRecommendation(answers) : null;

  function answer(value: string) {
    setAnswers(prev => ({ ...prev, [current.id]: value }));
  }

  function next() {
    if (!currentAnswer) return;
    if (step < QUESTIONS.length - 1) setStep(s => s + 1);
    else setStep(QUESTIONS.length);
  }

  function reset() {
    setStep(0);
    setAnswers({});
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      {!isDone && (
        <div className="flex gap-2 mb-10">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i < step ? "bg-[#F2C14E]" : i === step ? "bg-[#F2C14E]/50" : "bg-[#8A93B8]/20"
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isDone && current && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-body text-xs text-[#8A93B8] uppercase tracking-widest mb-3">
              Question {step + 1} of {QUESTIONS.length}
            </p>
            <h2 className="font-display text-2xl text-[#F5F3EE] mb-6">{current.question}</h2>
            <div className="flex flex-col gap-3 mb-8">
              {current.options.map(opt => (
                <OptionButton
                  key={opt.id}
                  label={opt.label}
                  selected={currentAnswer === opt.id}
                  onClick={() => answer(opt.id)}
                />
              ))}
            </div>
            <div className="flex justify-between items-center">
              {step > 0 ? (
                <button onClick={() => setStep(s => s - 1)} className="font-body text-sm text-[#8A93B8] hover:text-[#F5F3EE] transition-colors">
                  ← Back
                </button>
              ) : <div />}
              <button
                onClick={next}
                disabled={!currentAnswer}
                className="rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm px-6 py-2.5 hover:bg-[#f5cd6b] active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {step === QUESTIONS.length - 1 ? "Show my match →" : "Next →"}
              </button>
            </div>
          </motion.div>
        )}

        {isDone && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-body text-xs text-[#8A93B8] uppercase tracking-widest mb-4">Your match</p>
            <div className="rounded-2xl border-2 border-[#F2C14E]/50 bg-[#0f1530] p-8 mb-6">
              <span
                className="inline-block font-body text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide"
                style={{ background: `${result.badgeColor}20`, color: result.badgeColor }}
              >
                {result.badge}
              </span>
              <h2 className="font-display text-3xl text-[#F5F3EE] mb-4">{result.title}</h2>
              <p className="font-body text-base text-[#8A93B8] leading-relaxed mb-6">{result.why}</p>
              <Link
                href={`/courses/${result.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#F2C14E] text-[#0B1026] font-body font-semibold text-sm px-6 py-2.5 hover:bg-[#f5cd6b] active:scale-95 transition-all"
              >
                View this program →
              </Link>
            </div>

            {result.alternatives && result.alternatives.length > 0 && (
              <div className="mb-8">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#8A93B8] mb-4">Also worth considering</p>
                <div className="flex flex-col gap-3">
                  {result.alternatives.map(alt => (
                    <div key={alt.slug} className="rounded-xl border border-[#8A93B8]/15 bg-[#0f1530] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-body text-sm font-medium text-[#F5F3EE] mb-1">{alt.title}</p>
                          <p className="font-body text-xs text-[#8A93B8]">{alt.reason}</p>
                        </div>
                        <Link href={`/courses/${alt.slug}`} className="font-body text-xs text-[#F2C14E] underline shrink-0 hover:no-underline">
                          View →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={reset} className="font-body text-sm text-[#8A93B8] hover:text-[#F5F3EE] transition-colors underline">
              Retake quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
