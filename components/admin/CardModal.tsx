"use client";

import { useEffect, useState } from "react";
import type { Card } from "@prisma/client";
import type { CardCategory } from "@/lib/types";
import ImageUploader from "./ImageUploader";

interface CardModalProps {
  open: boolean;
  initialCard?: Card | null;
  onClose: () => void;
  onSaved: (card: Card) => void;
}

type CardFormState = {
  title: string;
  category: CardCategory;
  tag: string;
  metric: string;
  description: string;
  is_visible: boolean;
  image_url: string | null;
  image_public_id: string | null;
};

const defaultState: CardFormState = {
  title: "",
  category: "project",
  tag: "",
  metric: "",
  description: "",
  is_visible: true,
  image_url: null,
  image_public_id: null
};

export default function CardModal({ open, initialCard, onClose, onSaved }: CardModalProps) {
  const [form, setForm] = useState<CardFormState>(defaultState);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (initialCard) {
      setForm({
        title: initialCard.title,
        category: initialCard.category as CardCategory,
        tag: initialCard.tag || "",
        metric: initialCard.metric || "",
        description: initialCard.description || "",
        is_visible: initialCard.is_visible,
        image_url: initialCard.image_url,
        image_public_id: initialCard.image_public_id
      });
    } else {
      setForm(defaultState);
    }
  }, [open, initialCard]);

  if (!open) return null;

  async function onSubmit() {
    if (!form.title.trim()) return;

    setSaving(true);
    const isEdit = Boolean(initialCard?.id);
    const url = isEdit ? `/api/cards/${initialCard?.id}` : "/api/cards";
    const method = isEdit ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      alert("Failed to save card");
      setSaving(false);
      return;
    }

    const saved = await response.json();
    onSaved(saved);
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#2A2A2A] bg-[#161616] p-8" style={{ maxHeight: "90vh" }}>
        <div className="mb-5 h-1 w-20 rounded-full bg-[#FF5C1A]" />
        <h3 className="font-heading text-4xl text-white">{initialCard ? "Edit Card" : "Add New Card"}</h3>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-[#AAAAAA]">Title*</label>
            <input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="w-full rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-[#AAAAAA]">Category*</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as CardCategory }))}
              className="w-full rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3"
            >
              <option value="project">Project</option>
              <option value="skill">Skill</option>
              <option value="achievement">Achievement</option>
              <option value="experience">Experience</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-[#AAAAAA]">Tag / Platform</label>
              <input
                value={form.tag}
                onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
                placeholder="e.g. Instagram, Shopee"
                className="w-full rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-[#AAAAAA]">Metric / Result</label>
              <input
                value={form.metric}
                onChange={(e) => setForm((p) => ({ ...p, metric: e.target.value }))}
                placeholder="e.g. ↑ Engagement"
                className="w-full rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-[#AAAAAA]">Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className="w-full rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3"
            />
          </div>

          <label className="inline-flex items-center gap-3 text-sm text-[#AAAAAA]">
            <input
              type="checkbox"
              checked={form.is_visible}
              onChange={(e) => setForm((p) => ({ ...p, is_visible: e.target.checked }))}
            />
            Visible on site
          </label>

          <div>
            <p className="mb-2 text-sm text-[#AAAAAA]">Photo</p>
            <ImageUploader
              folder="raffie-portfolio/cards"
              value={{ image_url: form.image_url, image_public_id: form.image_public_id }}
              onChange={(img) => setForm((p) => ({ ...p, ...img }))}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button type="button" className="rounded-xl border border-[#2A2A2A] px-5 py-2 text-[#AAAAAA]" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-[#FF5C1A] px-5 py-2 font-semibold text-white transition hover:bg-[#C23A0F]"
            onClick={onSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Card"}
          </button>
        </div>
      </div>
    </div>
  );
}
