import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1026] px-6">
      <div className="text-center">
        <p className="font-display text-6xl text-[#F2C14E] mb-4">404</p>
        <h1 className="font-display text-2xl text-[#F5F3EE] mb-3">
          We couldn&apos;t find that page.
        </h1>
        <p className="font-body text-sm text-[#8A93B8] mb-8">
          It may have moved, or the link might be incorrect.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#F2C14E] px-6 py-3 font-body font-semibold text-[#0B1026] hover:bg-[#f5cd6b] transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
