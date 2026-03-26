"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Card } from "@prisma/client";
import { fadeUp, stagger } from "./motion";

interface ProjectsSectionProps {
  cards: Card[];
}

export default function ProjectsSection({ cards }: ProjectsSectionProps) {
  return (
    <section id="projects" className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-heading text-5xl text-[var(--text-primary)]">
          Selected Projects
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.article
              key={card.id}
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border border-border bg-base transition hover:-translate-y-1 hover:border-accent"
            >
              <div className="relative aspect-video w-full bg-gradient-to-br from-[#1E1E1E] to-[#0D0D0D]">
                {card.image_url ? (
                  <Image src={card.image_url} alt={card.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover grayscale" />
                ) : null}
              </div>
              <div className="p-6">
                {card.tag ? <p className="inline-flex rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">{card.tag}</p> : null}
                <h3 className="mt-3 font-heading text-3xl text-[var(--text-primary)]">{card.title}</h3>
                <p className="mt-3 text-sm text-muted">{card.description}</p>
                {card.metric ? <p className="mt-4 text-sm font-semibold text-accent">{card.metric}</p> : null}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
