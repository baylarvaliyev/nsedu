"use client";

import { useState } from "react";
import StarFieldIntro from "@/components/StarFieldIntro";
import Hero from "@/components/Hero";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <StarFieldIntro onComplete={() => setIntroDone(true)} />
      <main className="flex-1">
        <Hero ready={introDone} />
      </main>
    </>
  );
}
