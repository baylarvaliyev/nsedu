"use client";

import type { Locale } from "@/lib/locale";
import { MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "994773698929";
const DISPLAY_PHONE = "+994 77 369 89 29";

const CONTACT_STRINGS = {
  en: {
    eyebrow: "Contact",
    heading: "Talk to an advisor.",
    body: "Have a question about a course, pricing, or what's the right fit for you? Message us on WhatsApp or give us a call — we're happy to help.",
    whatsapp_cta: "Message on WhatsApp",
    whatsapp_message: "Hi! I'd like to talk to an advisor about North Star Academy courses.",
    call_cta: "Call us",
  },
  az: {
    eyebrow: "Əlaqə",
    heading: "Məsləhətçi ilə danışın.",
    body: "Kurslar, qiymətlər və ya sizə uyğun seçim haqqında sualınız var? WhatsApp-da yazın və ya bizə zəng edin — kömək etməkdən şad olarıq.",
    whatsapp_cta: "WhatsApp-da yazın",
    whatsapp_message: "Salam! North Star Academy kursları haqqında məsləhətçi ilə danışmaq istəyirəm.",
    call_cta: "Bizə zəng edin",
  },
  ru: {
    eyebrow: "Контакты",
    heading: "Поговорить с консультантом.",
    body: "Есть вопрос о курсах, ценах или о том, что вам подойдёт? Напишите нам в WhatsApp или позвоните — мы будем рады помочь.",
    whatsapp_cta: "Написать в WhatsApp",
    whatsapp_message: "Здравствуйте! Я хотел(а) бы поговорить с консультантом о курсах North Star Academy.",
    call_cta: "Позвонить нам",
  },
} as const;

export default function ContactSection({ locale = "en" as Locale }: { locale?: Locale }) {
  const t = CONTACT_STRINGS[locale];
  const whatsappMessage = encodeURIComponent(t.whatsapp_message);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
  const telLink = `tel:${WHATSAPP_NUMBER}`;

  return (
    <section id="contact" className="relative z-10 py-24 px-6 border-t border-[#8A93B8]/10">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-[#8A93B8] mb-4">
          {t.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-[#F5F3EE] mb-6">
          {t.heading}
        </h2>
        <p className="font-body text-base text-[#8A93B8] leading-relaxed mb-10">
          {t.body}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white font-body font-semibold text-sm px-7 py-3 hover:bg-[#21bd5b] transition-colors"
          >
            <MessageCircle size={18} />
            {t.whatsapp_cta}
          </a>
          <a
            href={telLink}
            className="inline-flex items-center gap-2 rounded-full border border-[#8A93B8]/40 text-[#F5F3EE] font-body font-medium text-sm px-7 py-3 hover:border-[#8A93B8] transition-colors"
          >
            <Phone size={18} />
            {DISPLAY_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
