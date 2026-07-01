import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseQuiz from "@/components/CourseQuiz";
import PageAscentBackground from "@/components/PageAscentBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Which Course Is Right for You? — North Star Academy",
  description: "Answer 4 quick questions and we'll match you with the right Data Science or Analytics course for your background and goals.",
};

export default function CourseQuizPage() {
  return (
    <>
      <PageAscentBackground />
      <Header locale="en" />
      <main className="relative flex-1 pt-16">
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12 text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
              Course Finder
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-[#F5F3EE] mb-4">
              Which course is<br className="hidden sm:block" /> right for you?
            </h1>
            <p className="font-body text-base text-[#8A93B8] max-w-xl mx-auto">
              4 quick questions. A clear recommendation — and honest alternatives
              if your situation is more nuanced than one answer.
            </p>
          </div>
          <CourseQuiz />
        </div>
      </main>
      <Footer locale="en" />
    </>
  );
}
