"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  BookOpen,
  FolderTree,
  Newspaper,
  HelpCircle,
  Award,
  Briefcase,
  Users,
  Inbox,
  History,
  LogOut,
  Menu,
  X,
} from "lucide-react";

type Role = "owner" | "editor";

const NAV_ITEMS: { href: string; label: string; icon: typeof BookOpen; ownerOnly?: boolean }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Course Leads", icon: Inbox },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle, ownerOnly: true },
  { href: "/admin/certificates", label: "Certificates", icon: Award, ownerOnly: true },
  { href: "/admin/staff", label: "Staff", icon: Users, ownerOnly: true },
  { href: "/admin/audit-log", label: "Audit Log", icon: History, ownerOnly: true },
];

export default function AdminShell({
  role,
  name,
  children,
}: {
  role: Role;
  name: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.ownerOnly || role === "owner"
  );

  const sidebarContent = (
    <>
      <div className="px-6 py-6 border-b border-[#8A93B8]/10 flex items-start justify-between">
        <div>
          <p className="font-display text-lg text-[#F5F3EE]">North Star Academy</p>
          <p className="font-body text-xs text-[#8A93B8] mt-0.5">{name}</p>
          <span className="inline-block mt-2 font-body text-[10px] uppercase tracking-wider text-[#F2C14E] bg-[#F2C14E]/10 rounded px-2 py-0.5">
            {role}
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(false)}
          className="md:hidden text-[#8A93B8] hover:text-[#F5F3EE] -mt-1"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-[#F5F3EE]/80 hover:bg-white/5 hover:text-[#F5F3EE] transition-colors"
            >
              <Icon size={17} />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-[#8A93B8]/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-[#8A93B8] hover:bg-white/5 hover:text-[#F5F3EE] transition-colors w-full"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f7f6f3]">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-[#0b1026] px-4 py-3 sticky top-0 z-30">
        <p className="font-display text-base text-[#F5F3EE]">North Star Academy</p>
        <button
          onClick={() => setMenuOpen(true)}
          className="text-[#F5F3EE]"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#0b1026] flex flex-col h-full">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop permanent sidebar */}
      <aside className="hidden md:flex md:w-60 bg-[#0b1026] flex-col shrink-0">
        {sidebarContent}
      </aside>

      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto min-w-0">{children}</main>
    </div>
  );
}
