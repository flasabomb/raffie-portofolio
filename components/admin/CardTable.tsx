"use client";
/* eslint-disable @next/next/no-img-element */

import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react";
import ReorderHandle from "./ReorderHandle";

interface CardTableProps {
  cards: Card[];
  onEdit: (card: Card) => void;
  onDelete: (card: Card) => void;
  onToggleVisible: (card: Card) => void;
  onReorder: (cards: Card[]) => void;
}

function categoryColor(category: string) {
  if (category === "project") return "bg-blue-500/20 text-blue-300";
  if (category === "skill") return "bg-green-500/20 text-green-300";
  if (category === "achievement") return "bg-yellow-500/20 text-yellow-300";
  return "bg-purple-500/20 text-purple-300";
}

function SortableRow({
  card,
  onEdit,
  onDelete,
  onToggleVisible
}: {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (card: Card) => void;
  onToggleVisible: (card: Card) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b border-[#2A2A2A]">
      <td className="px-2 py-3">
        <button className="inline-flex" {...attributes} {...listeners}>
          <ReorderHandle />
        </button>
      </td>
      <td className="px-2 py-3">
        {card.image_url ? (
          <img src={card.image_url} alt={card.title} className="h-10 w-10 rounded object-cover" />
        ) : (
          <div className="h-10 w-10 rounded bg-[#2A2A2A]" />
        )}
      </td>
      <td className="px-2 py-3 text-sm text-white">{card.title}</td>
      <td className="px-2 py-3">
        <span className={`rounded-full px-2 py-1 text-xs ${categoryColor(card.category)}`}>{card.category}</span>
      </td>
      <td className="px-2 py-3 text-xs text-[#AAAAAA]">{card.tag || "-"}</td>
      <td className="px-2 py-3 text-xs text-[#AAAAAA]">{card.metric || "-"}</td>
      <td className="px-2 py-3">
        <button
          type="button"
          onClick={() => onToggleVisible(card)}
          className={`relative h-6 w-11 rounded-full transition ${card.is_visible ? "bg-[#FF5C1A]" : "bg-[#2A2A2A]"}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${card.is_visible ? "left-5" : "left-0.5"}`}
          />
        </button>
      </td>
      <td className="px-2 py-3">
        <div className="flex items-center gap-2">
          <button type="button" className="text-[#AAAAAA] hover:text-white" onClick={() => onEdit(card)}>
            <Pencil size={16} />
          </button>
          <button type="button" className="text-[#AAAAAA] hover:text-[#EF4444]" onClick={() => onDelete(card)}>
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function CardTable({ cards, onEdit, onDelete, onToggleVisible, onReorder }: CardTableProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = cards.findIndex((item) => item.id === active.id);
    const newIndex = cards.findIndex((item) => item.id === over.id);

    const moved = arrayMove(cards, oldIndex, newIndex).map((item, index) => ({
      ...item,
      order_index: index
    }));

    onReorder(moved);
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#2A2A2A]">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
          <table className="min-w-full bg-[#161616] text-left">
            <thead className="bg-[#0D0D0D] text-xs uppercase text-[#AAAAAA]">
              <tr>
                <th className="px-2 py-3">⠿</th>
                <th className="px-2 py-3">Thumb</th>
                <th className="px-2 py-3">Title</th>
                <th className="px-2 py-3">Category</th>
                <th className="px-2 py-3">Tag</th>
                <th className="px-2 py-3">Metric</th>
                <th className="px-2 py-3">Visible</th>
                <th className="px-2 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <SortableRow key={card.id} card={card} onEdit={onEdit} onDelete={onDelete} onToggleVisible={onToggleVisible} />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
}
