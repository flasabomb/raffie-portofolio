import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import type { ContactInfo } from "@prisma/client";

interface ContactSectionProps {
  contact: ContactInfo | null;
}

function parseWhatsapp(whatsapp: string) {
  return whatsapp.replace(/[^\d]/g, "");
}

export default function ContactSection({ contact }: ContactSectionProps) {
  if (!contact) return null;

  return (
    <section id="contact" className="bg-base py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="h-1 w-full rounded-full bg-gradient-to-r from-accent via-[var(--accent-dark)] to-transparent" />

        <h2 className="mt-8 font-heading text-5xl text-[var(--text-primary)] md:text-6xl">{contact.cta_text}</h2>
        <p className="mt-3 text-muted">Let&apos;s create something great together.</p>

        <div className="mt-8 grid gap-4 text-muted md:grid-cols-2">
          <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 rounded-xl border border-border p-4 transition hover:text-accent">
            <Mail size={18} /> {contact.email}
          </a>
          <a href={`https://wa.me/${parseWhatsapp(contact.whatsapp)}`} className="inline-flex items-center gap-3 rounded-xl border border-border p-4 transition hover:text-accent">
            <MessageCircle size={18} /> {contact.whatsapp}
          </a>
          <a href={`https://instagram.com/${contact.instagram.replace("@", "")}`} className="inline-flex items-center gap-3 rounded-xl border border-border p-4 transition hover:text-accent">
            <Instagram size={18} /> {contact.instagram}
          </a>
          <a href={`https://${contact.linkedin.replace(/^https?:\/\//, "")}`} className="inline-flex items-center gap-3 rounded-xl border border-border p-4 transition hover:text-accent">
            <Linkedin size={18} /> {contact.linkedin}
          </a>
        </div>

        <a href={`mailto:${contact.email}`} className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 text-lg font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-dark)]">
          Send a Message →
        </a>
      </div>
    </section>
  );
}
