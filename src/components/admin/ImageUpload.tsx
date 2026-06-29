"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, RefreshCw } from "lucide-react";

export default function ImageUpload({
  value,
  onChange,
  folder,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setError(null);
    setUploading(true);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("course-images")
      .upload(path, file);

    if (uploadError) {
      setUploading(false);
      setError("Upload failed: " + uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("course-images").getPublicUrl(path);
    setUploading(false);
    onChange(data.publicUrl);
  }

  return (
    <div>
      {value ? (
        <div className="relative w-full max-w-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full rounded-lg border border-[#ddd] object-cover" />
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-black/60 text-white rounded-full p-1 hover:bg-black/80 disabled:opacity-60"
              aria-label="Replace image"
              title="Replace image"
            >
              <RefreshCw size={14} className={uploading ? "animate-spin" : ""} />
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              disabled={uploading}
              className="bg-black/60 text-white rounded-full p-1 hover:bg-black/80 disabled:opacity-60"
              aria-label="Remove image"
              title="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-lg border border-dashed border-[#ccc] px-4 py-3 font-body text-sm text-[#888] hover:border-[#0B1026]/40 hover:text-[#0B1026] transition-colors disabled:opacity-60"
        >
          <Upload size={16} />
          {uploading ? "Uploading..." : "Upload image"}
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      {error && <p className="font-body text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
