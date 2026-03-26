"use client";

import { useState } from "react";
import type { HeroSettings } from "@prisma/client";
import ImageUploader from "./ImageUploader";

interface HeroEditorProps {
  initialHero: HeroSettings;
}

export default function HeroEditor({ initialHero }: HeroEditorProps) {
  const [hero, setHero] = useState(initialHero);
  const [saving, setSaving] = useState(false);

  async function saveHero() {
    setSaving(true);
    const res = await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hero)
    });

    setSaving(false);

    if (!res.ok) {
      alert("Failed to save hero settings");
      return;
    }

    alert("Hero section saved!");
  }

  const updateField = (key: keyof HeroSettings, value: string | null) => {
    setHero((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="grid gap-6 xl:grid-cols-5">
      <div className="space-y-4 xl:col-span-3">
        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-5">
          <h3 className="font-heading text-3xl text-white">Portrait Photo</h3>
          <div className="mt-4">
            <ImageUploader
              folder="raffie-portfolio/hero"
              value={{ image_url: hero.portrait_url, image_public_id: hero.portrait_public_id }}
              onChange={(img) => setHero((prev) => ({ ...prev, portrait_url: img.image_url, portrait_public_id: img.image_public_id }))}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-5">
          <h3 className="font-heading text-3xl text-white">Headline</h3>
          <div className="mt-4 grid gap-3">
            <input value={hero.headline_1} onChange={(e) => updateField("headline_1", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
            <input value={hero.headline_2} onChange={(e) => updateField("headline_2", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
            <input value={hero.headline_3} onChange={(e) => updateField("headline_3", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-5">
          <h3 className="font-heading text-3xl text-white">Quote & Bio</h3>
          <div className="mt-4 grid gap-3">
            <textarea rows={3} value={hero.quote} onChange={(e) => updateField("quote", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
            <textarea rows={4} value={hero.bio} onChange={(e) => updateField("bio", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-5">
          <h3 className="font-heading text-3xl text-white">Service Tags</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input value={hero.service_tag_1} onChange={(e) => updateField("service_tag_1", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
            <input value={hero.service_tag_2} onChange={(e) => updateField("service_tag_2", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
            <input value={hero.service_tag_3} onChange={(e) => updateField("service_tag_3", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
            <input value={hero.service_tag_4} onChange={(e) => updateField("service_tag_4", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-5">
          <h3 className="font-heading text-3xl text-white">Trusted Bar</h3>
          <div className="mt-4 grid gap-3">
            <input value={hero.trusted_bar_label} onChange={(e) => updateField("trusted_bar_label", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
            <div className="grid gap-3 md:grid-cols-2">
              <input value={hero.trusted_1} onChange={(e) => updateField("trusted_1", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
              <input value={hero.trusted_2} onChange={(e) => updateField("trusted_2", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
              <input value={hero.trusted_3} onChange={(e) => updateField("trusted_3", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
              <input value={hero.trusted_4} onChange={(e) => updateField("trusted_4", e.target.value)} className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
            </div>
          </div>
        </div>
      </div>

      <aside className="xl:col-span-2">
        <div className="sticky top-24 rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D] p-5">
          <h3 className="font-heading text-3xl text-white">Live Preview</h3>
          <p className="mt-2 text-sm text-[#AAAAAA]">Updates instantly as you type.</p>
          <div className="mt-5 rounded-xl border border-[#2A2A2A] bg-[#161616] p-4">
            <p className="text-sm text-[#AAAAAA]">{hero.headline_1}</p>
            <p className="font-heading text-4xl leading-none text-white">{hero.headline_2}</p>
            <p className="font-heading text-4xl leading-none text-white">{hero.headline_3}</p>
            <p className="mt-4 text-sm italic text-white">{hero.quote}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[hero.service_tag_1, hero.service_tag_2, hero.service_tag_3, hero.service_tag_4].map((tag) => (
              <span key={tag} className="rounded-full bg-[#FF5C1A]/15 px-3 py-1 text-xs text-[#FF5C1A]">
                {tag}
              </span>
            ))}
          </div>
          <button type="button" className="mt-6 w-full rounded-xl bg-[#FF5C1A] px-4 py-3 font-semibold text-white" onClick={saveHero}>
            {saving ? "Saving..." : "Save Hero"}
          </button>
          <a href="/?preview=true" target="_blank" rel="noreferrer" className="mt-3 block text-center text-sm text-[#FF5C1A]">
            Preview Full Site →
          </a>
        </div>
      </aside>
    </div>
  );
}
