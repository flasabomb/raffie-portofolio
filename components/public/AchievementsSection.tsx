import type { Card } from "@prisma/client";

interface AchievementsSectionProps {
  cards: Card[];
}

export default function AchievementsSection({ cards }: AchievementsSectionProps) {
  return (
    <section id="achievements" className="bg-base py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="font-heading text-5xl text-[var(--text-primary)]">Key Achievements</h2>

        <div className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.id} className="rounded-2xl border border-border bg-surface p-8">
              <p className="font-heading text-4xl text-accent">{card.metric}</p>
              <h3 className="mt-3 font-heading text-3xl text-[var(--text-primary)]">{card.title}</h3>
              {card.tag ? <p className="mt-3 inline-flex rounded-full bg-[#2A2A2A] px-3 py-1 text-xs text-accent">{card.tag}</p> : null}
              <p className="mt-4 text-sm text-muted">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
