import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import { UI_STRINGS } from "@/lib/uiStrings";

export default function Footer({ locale = "en" as Locale }: { locale?: Locale }) {
  const t = UI_STRINGS[locale] ?? UI_STRINGS.en;
  const homePath = localizedPath("/", locale);

  return (
    <footer className="bg-[#060815] border-t border-[#8A93B8]/10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg text-[#F5F3EE]">North Star Academy</p>
          <p className="font-body text-sm text-[#8A93B8] mt-2 max-w-xs">
            {t.footer_tagline}
          </p>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-[#8A93B8] mb-3">
            {t.footer_explore}
          </p>
          <div className="flex flex-col gap-2">
            <a href={`${homePath}#courses`} className="font-body text-sm text-[#F5F3EE]/80 hover:text-[#F5F3EE]">{t.footer_courses}</a>
            <a href={localizedPath("/blog", locale)} className="font-body text-sm text-[#F5F3EE]/80 hover:text-[#F5F3EE]">{t.footer_blog}</a>
            <a href={`${homePath}#faq`} className="font-body text-sm text-[#F5F3EE]/80 hover:text-[#F5F3EE]">{t.footer_faq}</a>
            <a href={localizedPath("/certificates", locale)} className="font-body text-sm text-[#F5F3EE]/80 hover:text-[#F5F3EE]">{t.footer_certificates}</a>
          </div>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-[#8A93B8] mb-3">
            {t.footer_contact}
          </p>
          <div className="flex flex-col gap-2">
            <a href={`${homePath}#contact`} className="font-body text-sm text-[#F5F3EE]/80 hover:text-[#F5F3EE]">{t.footer_talk_advisor}</a>
            <p className="font-body text-sm text-[#F5F3EE]/80">Baku, Azerbaijan</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-[#8A93B8]/10">
        <p className="font-body text-xs text-[#8A93B8]">
          © {new Date().getFullYear()} North Star Academy. {t.footer_rights}
        </p>
      </div>
    </footer>
  );
}
