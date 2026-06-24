"use client";

import { useCallback, useState } from "react";
import StarFieldIntro from "@/components/StarFieldIntro";
import Hero from "@/components/Hero";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroDone(true), []);

  return (
    <>
      <StarFieldIntro onComplete={handleIntroComplete} />
      <main className="flex-1">
        <Hero ready={introDone} />
      </main>
    </>
  );
}
