"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  BookOpen,
  FolderTree,
  Newspaper,
  HelpCircle,
  Award,
  Users,
  LogOut,
} from "lucide-react";

type Role = "owner" | "editor";

const NAV_ITEMS: { href: string; label: string; icon: typeof BookOpen; ownerOnly?: boolean }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle, ownerOnly: true },
  { href: "/admin/certificates", label: "Certificates", icon: Award, ownerOnly: true },
  { href: "/admin/staff", label: "Staff", icon: Users, ownerOnly: true },
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

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.ownerOnly || role === "owner"
  );

  return (
    <div className="min-h-screen flex bg-[#f7f6f3]">
      <aside className="w-60 bg-[#0b1026] flex flex-col">
        <div className="px-6 py-6 border-b border-[#8A93B8]/10">
          <p className="font-display text-lg text-[#F5F3EE]">North Star</p>
          <p className="font-body text-xs text-[#8A93B8] mt-0.5">{name}</p>
          <span className="inline-block mt-2 font-body text-[10px] uppercase tracking-wider text-[#F2C14E] bg-[#F2C14E]/10 rounded px-2 py-0.5">
            {role}
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg font-body text-sm text-[#F5F3EE]/80 hover:bg-white/5 hover:text-[#F5F3EE] transition-colors"
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
            className="flex items-center gap-3 px-3 py-2 rounded-lg font-body text-sm text-[#8A93B8] hover:bg-white/5 hover:text-[#F5F3EE] transition-colors w-full"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
