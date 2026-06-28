"use client";

import Image from "next/image";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

export function CoverImageUploader({
  initialCoverUrl = "",
}: {
  initialCoverUrl?: string;
}) {
  const [savedCoverImageUrl, setSavedCoverImageUrl] = useState(initialCoverUrl);
  const [draftCoverImageUrl, setDraftCoverImageUrl] = useState("");
  const [draftFile, setDraftFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const coverInputRef = useRef<HTMLInputElement>(null);
  const savedCoverImageUrlRef = useRef(initialCoverUrl);
  const draftCoverImageUrlRef = useRef("");

  const coverImageUrl = draftCoverImageUrl || savedCoverImageUrl;
  const hasDraftCover = draftCoverImageUrl !== "";

  useEffect(() => {
    savedCoverImageUrlRef.current = savedCoverImageUrl;
  }, [savedCoverImageUrl]);

  useEffect(() => {
    draftCoverImageUrlRef.current = draftCoverImageUrl;
  }, [draftCoverImageUrl]);

  useEffect(() => {
    return () => {
      if (savedCoverImageUrlRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(savedCoverImageUrlRef.current);
      }
      if (draftCoverImageUrlRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(draftCoverImageUrlRef.current);
      }
    };
  }, []);

  const handleCoverImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (draftCoverImageUrl) URL.revokeObjectURL(draftCoverImageUrl);

    setDraftFile(file);
    setDraftCoverImageUrl(URL.createObjectURL(file));
    setError("");
    event.target.value = "";
  };

  const saveCoverImage = async () => {
    if (!draftCoverImageUrl || !draftFile) return;

    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", draftFile);

      const res = await fetch("/api/profile/cover", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Upload failed");
      }

      const { coverImageUrl: serverUrl } = await res.json();

      if (savedCoverImageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(savedCoverImageUrl);
      }

      setSavedCoverImageUrl(serverUrl);
      setDraftCoverImageUrl("");
      setDraftFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const cancelCoverImage = () => {
    if (draftCoverImageUrl) URL.revokeObjectURL(draftCoverImageUrl);
    setDraftCoverImageUrl("");
    setDraftFile(null);
    setError("");
  };

  const removeCoverImage = async () => {
    if (savedCoverImageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(savedCoverImageUrl);
    }

    try {
      await fetch("/api/profile/cover", { method: "DELETE" });
    } catch {
      // non-fatal
    }

    setSavedCoverImageUrl("");
    setDraftCoverImageUrl("");
    setDraftFile(null);
    setError("");
  };

  return (
    <section
      className="relative z-0 flex h-80 items-center justify-center bg-[#F4F4F5] bg-cover bg-center"
      style={coverImageUrl ? { backgroundImage: `url(${coverImageUrl})` } : {}}
    >
      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCoverImageChange}
      />

      {error && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {hasDraftCover ? (
        <div className="absolute right-16 top-5 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={saveCoverImage}
            disabled={saving}
            className="h-10 rounded-md bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <button
            type="button"
            onClick={cancelCoverImage}
            disabled={saving}
            className="h-10 rounded-md bg-white px-4 text-sm font-medium text-[#18181B] hover:bg-[#F4F4F5] disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      ) : coverImageUrl ? (
        <div className="absolute left-16 top-5 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-medium text-black hover:bg-zinc-200"
          >
            <span
              className="relative size-4 overflow-hidden"
              aria-hidden="true"
            >
              <Image src="/camera-dark.svg" alt="" width={15} height={12} />
            </span>
            <span>Change cover</span>
          </button>
          <button
            type="button"
            onClick={removeCoverImage}
            className="h-10 rounded-md bg-white px-4 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => coverInputRef.current?.click()}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium leading-5 text-white hover:bg-zinc-800"
        >
          <span className="relative size-4 overflow-hidden" aria-hidden="true">
            <Image src="/camera.svg" alt="" width={15} height={12} />
          </span>
          <span>Add a cover image</span>
        </button>
      )}
    </section>
  );
}
