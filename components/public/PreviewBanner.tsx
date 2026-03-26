"use client";

export default function PreviewBanner() {
  return (
    <div className="sticky top-0 z-[70] flex items-center justify-between bg-accent px-4 py-3 text-sm font-semibold text-[var(--text-primary)] md:px-8">
      <p>👁 PREVIEW MODE - You are viewing unpublished content</p>
      <button
        type="button"
        className="rounded-full border border-white/50 px-3 py-1 text-xs hover:bg-white hover:text-accent"
        onClick={() => window.close()}
      >
        ✕ Exit Preview
      </button>
    </div>
  );
}
