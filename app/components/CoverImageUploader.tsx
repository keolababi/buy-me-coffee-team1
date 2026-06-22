"use client";

import Image from "next/image";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

export function CoverImageUploader() {
  const [savedCoverImageUrl, setSavedCoverImageUrl] = useState("");
  const [draftCoverImageUrl, setDraftCoverImageUrl] = useState("");
  const coverInputRef = useRef<HTMLInputElement>(null);
  const savedCoverImageUrlRef = useRef("");
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
      if (savedCoverImageUrlRef.current) {
        URL.revokeObjectURL(savedCoverImageUrlRef.current);
      }

      if (draftCoverImageUrlRef.current) {
        URL.revokeObjectURL(draftCoverImageUrlRef.current);
      }
    };
  }, []);

  const handleCoverImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (draftCoverImageUrl) {
      URL.revokeObjectURL(draftCoverImageUrl);
    }

    setDraftCoverImageUrl(URL.createObjectURL(file));
    event.target.value = "";
  };

  const saveCoverImage = () => {
    if (!draftCoverImageUrl) {
      return;
    }

    if (savedCoverImageUrl) {
      URL.revokeObjectURL(savedCoverImageUrl);
    }

    setSavedCoverImageUrl(draftCoverImageUrl);
    setDraftCoverImageUrl("");
  };

  const cancelCoverImage = () => {
    if (draftCoverImageUrl) {
      URL.revokeObjectURL(draftCoverImageUrl);
    }

    if (savedCoverImageUrl) {
      URL.revokeObjectURL(savedCoverImageUrl);
    }

    setSavedCoverImageUrl("");
    setDraftCoverImageUrl("");
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

      {hasDraftCover ? (
        <div className="absolute right-16 top-5 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={saveCoverImage}
            className="h-10 rounded-md bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={cancelCoverImage}
            className="h-10 rounded-md bg-white px-4 text-sm font-medium text-[#18181B] hover:bg-[#F4F4F5]"
          >
            Cancel
          </button>
        </div>
      ) : coverImageUrl ? (
        <button
          type="button"
          onClick={() => coverInputRef.current?.click()}
          className="absolute left-16 top-5 z-10 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-medium text-black hover:bg-zinc-200s"
        >
          <span className="relative size-4 overflow-hidden" aria-hidden="true">
            <Image src="/camera-dark.svg" alt="" width={15} height={12} />
          </span>
          <span>Change cover</span>
        </button>
      ) : !coverImageUrl ? (
        <button
          type="button"
          onClick={() => coverInputRef.current?.click()}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium leading-5 text-white hover:bg-zinc-800"
        >
          <span className="relative size-4 overflow-hidden" aria-hidden="true">
            <Image src="camera.svg" alt="" width={15} height={12} />
          </span>
          <span>Add a cover image</span>
        </button>
      ) : null}
    </section>
  );
}
