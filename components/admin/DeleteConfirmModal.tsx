"use client";

interface DeleteConfirmModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

export default function DeleteConfirmModal({ open, title, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6">
        <h3 className="font-heading text-3xl text-white">Delete Card</h3>
        <p className="mt-3 text-sm text-[#AAAAAA]">
          Are you sure you want to delete <span className="text-white">{title || "this card"}</span>? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className="rounded-xl border border-[#2A2A2A] px-4 py-2 text-[#AAAAAA]" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="rounded-xl bg-[#EF4444] px-4 py-2 font-semibold text-white" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
