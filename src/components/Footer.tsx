export default function Footer() {
  return (
    <footer className="bg-[#060815] border-t border-[#8A93B8]/10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg text-[#F5F3EE]">North Star Academy</p>
          <p className="font-body text-sm text-[#8A93B8] mt-2 max-w-xs">
            Data science, analytics, and language bootcamps in Baku.
          </p>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-[#8A93B8] mb-3">
            Explore
          </p>
          <div className="flex flex-col gap-2">
            <a href="#courses" className="font-body text-sm text-[#F5F3EE]/80 hover:text-[#F5F3EE]">Courses</a>
            <a href="/blog" className="font-body text-sm text-[#F5F3EE]/80 hover:text-[#F5F3EE]">Blog</a>
            <a href="#faq" className="font-body text-sm text-[#F5F3EE]/80 hover:text-[#F5F3EE]">FAQ</a>
          </div>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-[#8A93B8] mb-3">
            Contact
          </p>
          <div className="flex flex-col gap-2">
            <a href="#contact" className="font-body text-sm text-[#F5F3EE]/80 hover:text-[#F5F3EE]">Talk to an advisor</a>
            <p className="font-body text-sm text-[#F5F3EE]/80">Baku, Azerbaijan</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-[#8A93B8]/10">
        <p className="font-body text-xs text-[#8A93B8]">
          © {new Date().getFullYear()} North Star Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
