"use client";

import { motion } from "framer-motion";
import type { Card } from "@prisma/client";

interface ExperienceTimelineProps {
  cards: Card[];
}

export default function ExperienceTimeline({ cards }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="bg-surface py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <h2 className="font-heading text-5xl text-[var(--text-primary)]">Experience Timeline</h2>

        <div className="relative mt-10 border-l border-accent pl-8">
          {cards.map((card) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="relative mb-12 border-b border-border pb-12"
            >
              <span className="absolute -left-[40px] top-2 h-4 w-4 rounded-full bg-accent" />
              {card.tag ? <p className="inline-flex rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">{card.tag}</p> : null}
              <h3 className="mt-3 font-heading text-3xl text-[var(--text-primary)]">{card.title}</h3>
              {card.metric ? <p className="mt-2 text-sm text-muted">{card.metric}</p> : null}
              <p className="mt-4 text-sm text-muted">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
