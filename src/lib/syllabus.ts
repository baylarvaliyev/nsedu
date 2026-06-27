// Parses our syllabus text format (one phase per line, e.g.
// "Weeks 1-3: Foundations — core grammar...") into structured items for
// visual rendering. Falls back gracefully if the format doesn't match —
// any line becomes an item, with everything before the first colon (if
// present) treated as the phase label.
export type SyllabusItem = {
  label: string | null;
  detail: string;
};

export function parseSyllabus(raw: string | null): SyllabusItem[] {
  if (!raw) return [];

  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex === -1 || colonIndex > 40) {
        // No colon, or it's too far in to plausibly be a "Week X:" label —
        // treat the whole line as detail with no separate label.
        return { label: null, detail: line };
      }
      return {
        label: line.slice(0, colonIndex).trim(),
        detail: line.slice(colonIndex + 1).trim(),
      };
    });
}
