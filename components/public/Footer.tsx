export default function Footer() {
  return (
    <footer className="border-t border-border bg-base py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-sm text-muted md:px-8">
        <p className="font-heading text-2xl text-[var(--text-primary)]">Raffie Arfa</p>
        <p>© {new Date().getFullYear()} Raffie Arfa Nugraha. All rights reserved.</p>
      </div>
    </footer>
  );
}
