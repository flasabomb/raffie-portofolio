import type { HeroSettings } from "@prisma/client";

interface TrustedBarProps {
  hero: HeroSettings | null;
}

export default function TrustedBar({ hero }: TrustedBarProps) {
  if (!hero) return null;

  return (
    <section className="border-y border-border bg-surface py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-sm text-muted">{hero.trusted_bar_label}</p>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 md:flex md:gap-10">
          {[hero.trusted_1, hero.trusted_2, hero.trusted_3, hero.trusted_4].map((item) => (
            <span key={item} className="text-sm uppercase tracking-wider text-[var(--text-primary)]/40">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
