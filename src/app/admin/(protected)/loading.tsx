export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#0B1026]/15 border-t-[#0B1026] rounded-full animate-spin" />
        <p className="font-body text-sm text-[#888]">Loading…</p>
      </div>
    </div>
  );
}
