"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import { UI_STRINGS } from "@/lib/uiStrings";
import LanguageSwitcher from "./LanguageSwitcher";
import ExitIntentPopup from "./ExitIntentPopup";

export default function Header({ locale = "en" as Locale }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const t = UI_STRINGS[locale] ?? UI_STRINGS.en;

  const NAV_LINKS = [
    { href: `${localizedPath("/courses", locale)}#courses`, label: t.nav_courses },
    { href: `${localizedPath("/courses", locale)}#faq`, label: t.nav_faq },
    { href: localizedPath("/blog", locale), label: t.nav_blog },
  ];
  const contactHref = `${localizedPath("/courses", locale)}#contact`;

  return (
    <>
      <ExitIntentPopup locale={locale} />
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0b1026]/80 backdrop-blur-sm border-b border-[#8A93B8]/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href={localizedPath("/", locale)} className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="North Star Academy" className="h-9 w-auto" />
          <span className="font-display text-lg text-[#F5F3EE] tracking-tight">
            North Star Academy
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-[#8A93B8] hover:text-[#F5F3EE] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitcher currentLocale={locale} />
          <a
            href={contactHref}
            className="font-body text-sm font-semibold rounded-full bg-[#F2C14E] text-[#0B1026] px-5 py-2 hover:bg-[#f5cd6b] active:scale-95 transition-all"
          >
            {t.nav_apply}
          </a>
        </nav>

        <button
          className="md:hidden text-[#F5F3EE]"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0b1026] border-t border-[#8A93B8]/10 px-6 py-4 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-body text-sm text-[#8A93B8] hover:text-[#F5F3EE] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitcher currentLocale={locale} />
          <a
            href={contactHref}
            onClick={() => setOpen(false)}
            className="font-body text-sm font-semibold rounded-full bg-[#F2C14E] text-[#0B1026] px-5 py-2 text-center hover:bg-[#f5cd6b] active:scale-95 transition-all"
          >
            {t.nav_apply}
          </a>
        </motion.nav>
      )}
    </header>
    </>
  );
}
