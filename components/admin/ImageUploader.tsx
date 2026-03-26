"use client";

import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { DragEvent, useRef, useState } from "react";

interface ImageUploaderProps {
  folder: string;
  value?: { image_url: string | null; image_public_id: string | null };
  onChange: (data: { image_url: string | null; image_public_id: string | null }) => void;
}

const ACCEPT_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 5;

export default function ImageUploader({ folder, value, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function uploadFile(file: File) {
    if (!ACCEPT_TYPES.includes(file.type)) {
      alert("Only JPG, PNG, and WEBP are allowed.");
      return;
    }

    if (file.size > MAX_MB * 1024 * 1024) {
      alert("Max file size is 5MB.");
      return;
    }

    setUploading(true);
    setProgress(15);

    const signRes = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder })
    });

    if (!signRes.ok) {
      setUploading(false);
      alert("Failed to get upload signature.");
      return;
    }

    const signed = await signRes.json();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signed.apiKey);
    formData.append("timestamp", String(signed.timestamp));
    formData.append("signature", signed.signature);
    formData.append("folder", signed.folder);

    setProgress(45);

    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });

    if (!uploadRes.ok) {
      setUploading(false);
      alert("Upload failed.");
      return;
    }

    setProgress(85);
    const uploaded = await uploadRes.json();

    onChange({
      image_url: uploaded.secure_url,
      image_public_id: uploaded.public_id
    });

    setProgress(100);
    setTimeout(() => {
      setUploading(false);
      setProgress(0);
    }, 400);
  }

  async function onRemove() {
    if (value?.image_public_id) {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: value.image_public_id })
      });
    }

    onChange({ image_url: null, image_public_id: null });
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) void uploadFile(file);
  }

  return (
    <div className="space-y-3">
      <div
        className="cursor-pointer rounded-xl border-2 border-dashed border-[#FF5C1A] bg-[#0D0D0D] p-6 text-center"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadFile(file);
          }}
        />
        <UploadCloud className="mx-auto text-[#FF5C1A]" size={24} />
        <p className="mt-2 text-sm text-[#AAAAAA]">Drag and drop image here, or click to browse</p>
        <p className="text-xs text-[#AAAAAA]">JPG, PNG, WEBP up to 5MB</p>
      </div>

      {uploading ? (
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#2A2A2A]">
          <div className="h-full bg-[#FF5C1A] transition-all" style={{ width: `${progress}%` }} />
        </div>
      ) : null}

      {value?.image_url ? (
        <div className="relative overflow-hidden rounded-xl border border-[#2A2A2A]">
          <div className="relative h-44 w-full">
            <Image src={value.image_url} alt="Uploaded image" fill sizes="100vw" className="object-cover" />
          </div>
          <button
            type="button"
            className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
            onClick={onRemove}
          >
            <X size={12} /> Remove
          </button>
        </div>
      ) : null}
    </div>
  );
}
