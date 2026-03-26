"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Card } from "@prisma/client";
import { fadeUp, stagger } from "./motion";

interface SkillsGridProps {
  cards: Card[];
}

export default function SkillsGrid({ cards }: SkillsGridProps) {
  return (
    <section id="skills" className="bg-base py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <p className="font-heading text-xl uppercase tracking-wide text-accent">Core Skills</p>
          <h2 className="mt-2 font-heading text-5xl text-[var(--text-primary)]">What I Bring to the Table</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card, idx) => (
            <motion.article
              key={card.id}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              {card.image_url ? (
                <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl">
                  <Image src={card.image_url} alt={card.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover grayscale" />
                </div>
              ) : null}
              <p className="mb-3 inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">#{idx + 1}</p>
              <h3 className="font-heading text-3xl text-[var(--text-primary)]">{card.title}</h3>
              {card.tag ? <p className="mt-2 inline-flex rounded-full bg-[#2A2A2A] px-3 py-1 text-xs text-accent">{card.tag}</p> : null}
              <p className="mt-4 text-sm text-muted">{card.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
