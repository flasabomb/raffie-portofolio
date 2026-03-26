import TopBar from "@/components/admin/TopBar";

export default function DashboardRootPage() {
  return (
    <div>
      <TopBar title="Dashboard" />
      <div className="p-4 md:p-6">
        <div className="rounded-2xl border border-border bg-surface p-8 text-center text-[var(--text-primary)]">
          <h1 className="mb-2 text-2xl font-bold">Welcome back, Admin!</h1>
          <p className="text-muted">Select an option from the sidebar to start managing your portfolio.</p>
        </div>
      </div>
    </div>
  );
}
