"use client";

import { useCallback, useState } from "react";
import StarFieldIntro from "@/components/StarFieldIntro";
import Hero from "@/components/Hero";
import type { Locale } from "@/lib/locale";

export default function HomeIntro({ locale = "en" as Locale }: { locale?: Locale }) {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroDone(true), []);

  return (
    <>
      <StarFieldIntro onComplete={handleIntroComplete} />
      <Hero ready={introDone} locale={locale} />
    </>
  );
}
