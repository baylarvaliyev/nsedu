// Shown automatically by Next.js while this route segment's Server
// Component is fetching data — solves "I clicked and nothing seems to be
// happening" by giving instant visual feedback the moment a link is
// clicked, before the new page's data has even arrived from Supabase.
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1026]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#F2C14E]/30 border-t-[#F2C14E] rounded-full animate-spin" />
        <p className="font-body text-sm text-[#8A93B8]">Loading…</p>
      </div>
    </div>
  );
}
