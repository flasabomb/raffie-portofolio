"use client";

import { BarChart3, ImageIcon, Layers3, LogOut, Mail, PanelLeftClose, Sparkles, Palette } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/secret-admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/secret-admin/dashboard/hero", label: "Hero Section", icon: Sparkles },
  { href: "/secret-admin/dashboard/cards", label: "Content Cards", icon: Layers3 },
  { href: "/secret-admin/dashboard/contact", label: "Contact Info", icon: Mail },
  { href: "/secret-admin/dashboard/theme", label: "Theme & Styling", icon: Palette },
  { href: "/secret-admin/dashboard/media", label: "Media Library", icon: ImageIcon }
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobile = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-[#2A2A2A] bg-[#0D0D0D] p-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl text-white">Nugroho</h2>
          <span className="mt-1 inline-flex rounded-full bg-[#FF5C1A]/20 px-3 py-1 text-xs font-semibold text-[#FF5C1A]">ADMIN</span>
        </div>
        {mobile ? (
          <button type="button" className="text-[#AAAAAA]" onClick={onClose}>
            <PanelLeftClose size={18} />
          </button>
        ) : null}
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/secret-admin/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                active
                  ? "border-r-2 border-[#FF5C1A] bg-[#FF5C1A]/10 text-[#FF5C1A]"
                  : "text-[#AAAAAA] hover:bg-[#161616] hover:text-white"
              }`}
              onClick={onClose}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3">
        <a
          href="/?preview=true"
          target="_blank"
          className="block rounded-xl border border-[#FF5C1A] px-4 py-2 text-center text-sm text-[#FF5C1A] transition hover:bg-[#FF5C1A] hover:text-white"
          rel="noreferrer"
        >
          👁 Preview Site →
        </a>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm text-[#AAAAAA] transition hover:text-[#EF4444]"
          onClick={() => signOut({ callbackUrl: "/secret-admin" })}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
