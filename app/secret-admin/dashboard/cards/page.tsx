"use client";

import { useEffect, useMemo, useState } from "react";
import type { Card } from "@prisma/client";
import CardModal from "@/components/admin/CardModal";
import CardTable from "@/components/admin/CardTable";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import TopBar from "@/components/admin/TopBar";

const tabs = ["all", "project", "skill", "achievement", "experience"] as const;

type Tab = (typeof tabs)[number];

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [deleteCard, setDeleteCard] = useState<Card | null>(null);

  async function loadCards() {
    const res = await fetch("/api/cards", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setCards(data);
  }

  useEffect(() => {
    void loadCards();
  }, []);

  const filteredCards = useMemo(() => {
    if (activeTab === "all") return cards;
    return cards.filter((card) => card.category === activeTab);
  }, [cards, activeTab]);

  async function handleDelete() {
    if (!deleteCard) return;

    const res = await fetch(`/api/cards/${deleteCard.id}`, { method: "DELETE" });
    if (res.ok) {
      setCards((prev) => prev.filter((card) => card.id !== deleteCard.id));
    }
    setDeleteCard(null);
  }

  async function handleToggleVisible(card: Card) {
    const res = await fetch(`/api/cards/${card.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_visible: !card.is_visible })
    });

    if (!res.ok) return;

    setCards((prev) => prev.map((item) => (item.id === card.id ? { ...item, is_visible: !item.is_visible } : item)));
  }

  async function handleReorder(nextCards: Card[]) {
    setCards(nextCards);
    await fetch("/api/cards/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextCards.map((card) => ({ id: card.id, order_index: card.order_index })))
    });
  }

  return (
    <div>
      <TopBar
        title="Content Cards"
        action={
          <button
            type="button"
            onClick={() => {
              setEditingCard(null);
              setModalOpen(true);
            }}
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
          >
            + Add New Card
          </button>
        }
      />

      <div className="p-4 md:p-6">
        <div className="mb-5 flex flex-wrap items-center gap-5 border-b border-border pb-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm capitalize ${isActive ? "border-b-2 border-accent text-[var(--text-primary)]" : "text-muted"}`}
              >
                {tab === "all" ? "All" : `${tab}s`}
              </button>
            );
          })}
        </div>

        {filteredCards.length ? (
          <CardTable
            cards={filteredCards}
            onEdit={(card) => {
              setEditingCard(card);
              setModalOpen(true);
            }}
            onDelete={(card) => setDeleteCard(card)}
            onToggleVisible={handleToggleVisible}
            onReorder={handleReorder}
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted">
            No cards yet. Add your first card →
          </div>
        )}
      </div>

      <CardModal
        open={modalOpen}
        initialCard={editingCard}
        onClose={() => setModalOpen(false)}
        onSaved={(saved) => {
          setCards((prev) => {
            const index = prev.findIndex((c) => c.id === saved.id);
            if (index === -1) return [saved, ...prev];
            return prev.map((c) => (c.id === saved.id ? saved : c));
          });
        }}
      />

      <DeleteConfirmModal
        open={Boolean(deleteCard)}
        title={deleteCard?.title}
        onClose={() => setDeleteCard(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
