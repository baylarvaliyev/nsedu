import { parseSyllabus } from "@/lib/syllabus";

export default function SyllabusTimeline({ raw }: { raw: string | null }) {
  const items = parseSyllabus(raw);
  if (items.length === 0) return null;

  return (
    <div className="relative">
      {items.map((item, i) => (
        <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Connecting line + dot */}
          <div className="relative flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F2C14E] shrink-0 mt-1.5" />
            {i < items.length - 1 && (
              <div className="w-px flex-1 bg-[#8A93B8]/20 mt-1" />
            )}
          </div>

          <div className="flex-1 pb-1">
            {item.label && (
              <p className="font-display text-sm text-[#F2C14E] mb-1">
                {item.label}
              </p>
            )}
            <p className="font-body text-sm text-[#8A93B8] leading-relaxed">
              {item.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
