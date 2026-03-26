export default function Footer() {
  return (
    <footer className="border-t border-border bg-base py-8 text-center md:text-left">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted md:flex-row md:px-8">
        <p className="font-heading text-2xl text-[var(--text-primary)]">Nugroho</p>
        <p>© {new Date().getFullYear()} Raffie Arfa Nugraha. All rights reserved.</p>
      </div>
    </footer>
  );
}
