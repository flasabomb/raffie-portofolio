"use client";
import Image from "next/image";

interface MediaItem {
  image_url: string;
  image_public_id?: string | null;
  usedIn: string;
  canDelete: boolean;
}

interface MediaLibraryProps {
  items: MediaItem[];
}

export default function MediaLibrary({ items }: MediaLibraryProps) {
  async function deleteImage(publicId?: string | null) {
    if (!publicId) return;
    await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id: publicId })
    });
    window.location.reload();
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.image_url} className="overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#161616]">
          <div className="relative h-44 w-full">
            <Image src={item.image_url} alt={item.usedIn} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </div>
          <div className="p-4">
            <p className="truncate text-sm text-white">{item.image_public_id || "cloudinary-image"}</p>
            <p className="mt-1 text-xs text-[#AAAAAA]">Used in: {item.usedIn}</p>
            <button
              type="button"
              disabled={!item.canDelete}
              onClick={() => deleteImage(item.image_public_id)}
              className="mt-3 rounded-lg border border-[#2A2A2A] px-3 py-1 text-xs text-[#AAAAAA] disabled:opacity-40"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
