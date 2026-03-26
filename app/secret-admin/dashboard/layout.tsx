"use client";

import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const openSidebar = () => setMobileSidebarOpen(true);
    window.addEventListener("open-admin-sidebar", openSidebar);

    return () => {
      window.removeEventListener("open-admin-sidebar", openSidebar);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-surface text-[var(--text-primary)]">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {mobileSidebarOpen ? (
        <div className="fixed inset-0 z-40 bg-black/70 md:hidden" onClick={() => setMobileSidebarOpen(false)}>
          <div className="h-full w-64" onClick={(e) => e.stopPropagation()}>
            <Sidebar mobile onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
