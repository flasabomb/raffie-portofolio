"use client";

import { Menu } from "lucide-react";

interface TopBarProps {
  title: string;
  onMenuClick?: () => void;
  action?: React.ReactNode;
}

export default function TopBar({ title, onMenuClick, action }: TopBarProps) {
  function handleMenuClick() {
    if (onMenuClick) {
      onMenuClick();
      return;
    }

    window.dispatchEvent(new Event("open-admin-sidebar"));
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#2A2A2A] bg-[#161616]/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button type="button" className="text-white md:hidden" onClick={handleMenuClick}>
          <Menu size={20} />
        </button>
        <h1 className="font-heading text-3xl text-white">{title}</h1>
      </div>
      <div>{action}</div>
    </header>
  );
}
