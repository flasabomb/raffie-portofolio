"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { HeroSettings } from "@prisma/client";
import { fadeUp } from "./motion";

interface HeroSectionProps {
  hero: HeroSettings | null;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  if (!hero) return null;

  const tags = [hero.service_tag_1, hero.service_tag_2, hero.service_tag_3, hero.service_tag_4];

  return (
    <section id="hero" className="relative min-h-[700px] overflow-hidden bg-base pt-20 md:h-screen">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[45%]" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pb-8 pt-12 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid flex-1 items-start gap-10 md:grid-cols-2"
        >
          <div className="self-end">
            <motion.p variants={fadeUp} className="mb-2 text-2xl text-muted">
              {hero.headline_1}
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl leading-none text-[var(--text-primary)] sm:text-6xl md:text-9xl">
              {hero.headline_2}
            </motion.h1>
            <motion.h2 variants={fadeUp} className="font-heading text-5xl leading-none text-[var(--text-primary)] sm:text-6xl md:text-9xl">
              {hero.headline_3}
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="z-10 max-w-md justify-self-end pt-8 md:pt-0">
            <p className="text-2xl font-light italic text-[var(--text-primary)]">{hero.quote}</p>
            <p className="mt-4 text-sm text-muted">{hero.bio}</p>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 right-[-10%] md:right-[18%] h-[60%] md:h-[82%] w-[60%] md:w-[35%] min-w-[200px] md:min-w-[240px]">
          {hero.portrait_url ? (
            <Image
              src={hero.portrait_url}
              alt="Raffie portrait"
              fill
              sizes="35vw"
              className="hero-mask object-cover object-top"
            />
          ) : (
            <div className="hero-mask h-full w-full rounded-t-[120px] bg-gradient-to-b from-[#2A2A2A] to-[#0D0D0D]" />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-20 mt-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-black/35 backdrop-blur-md px-5 py-4 md:grid-cols-4"
        >
          {tags.map((tag) => (
            <p key={tag} className="font-heading text-sm uppercase text-accent md:text-lg">
              {tag}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
