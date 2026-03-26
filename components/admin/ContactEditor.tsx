"use client";

import { useState } from "react";
import type { ContactInfo } from "@prisma/client";

interface ContactEditorProps {
  initialContact: ContactInfo;
}

export default function ContactEditor({ initialContact }: ContactEditorProps) {
  const [form, setForm] = useState(initialContact);
  const [saving, setSaving] = useState(false);

  async function onSave() {
    setSaving(true);
    const res = await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setSaving(false);

    if (!res.ok) {
      alert("Failed to save contact info");
      return;
    }

    alert("Contact info saved!");
  }

  return (
    <div className="max-w-2xl rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
      <div className="grid gap-4">
        <input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
        <input value={form.whatsapp} onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))} placeholder="WhatsApp" className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
        <input value={form.instagram} onChange={(e) => setForm((p) => ({ ...p, instagram: e.target.value }))} placeholder="Instagram" className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
        <input value={form.linkedin} onChange={(e) => setForm((p) => ({ ...p, linkedin: e.target.value }))} placeholder="LinkedIn" className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
        <input value={form.cta_text} onChange={(e) => setForm((p) => ({ ...p, cta_text: e.target.value }))} placeholder="CTA Text" className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3" />
      </div>

      <button type="button" className="mt-5 rounded-xl bg-[#22C55E] px-5 py-2 font-semibold text-white" onClick={onSave}>
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
