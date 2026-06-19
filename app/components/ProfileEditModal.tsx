"use client";

import Image from "next/image";
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";

export type ProfileDetails = {
  name: string;
  about: string;
  socialUrl: string;
  avatarUrl: string;
};

type ProfileEditModalProps = {
  profile: ProfileDetails;
  onClose: () => void;
  onSave: (profile: ProfileDetails) => void;
};

export function ProfileEditModal({
  profile,
  onClose,
  onSave,
}: ProfileEditModalProps) {
  const [draftName, setDraftName] = useState(profile.name);
  const [draftAbout, setDraftAbout] = useState(profile.about);
  const [draftSocialUrl, setDraftSocialUrl] = useState(profile.socialUrl);
  const [draftAvatarUrl, setDraftAvatarUrl] = useState(profile.avatarUrl);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const createdAvatarUrlRef = useRef("");
  const transferredAvatarUrlRef = useRef("");

  useEffect(() => {
    return () => {
      const createdAvatarUrl = createdAvatarUrlRef.current;

      if (createdAvatarUrl && createdAvatarUrl !== transferredAvatarUrlRef.current) {
        URL.revokeObjectURL(createdAvatarUrl);
      }
    };
  }, []);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (createdAvatarUrlRef.current) {
      URL.revokeObjectURL(createdAvatarUrlRef.current);
    }

    const nextAvatarUrl = URL.createObjectURL(file);
    createdAvatarUrlRef.current = nextAvatarUrl;
    setDraftAvatarUrl(nextAvatarUrl);
    event.target.value = "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    transferredAvatarUrlRef.current = createdAvatarUrlRef.current;

    onSave({
      name: draftName.trim() || profile.name,
      about: draftAbout,
      socialUrl: draftSocialUrl,
      avatarUrl: draftAvatarUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-edit-title"
        className="w-full max-w-120 rounded-md bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="profile-edit-title" className="text-base font-semibold">
              Edit profile
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#71717A]">
              Make changes to your profile here. Click save when you&apos;re done.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-6 items-center justify-center rounded-sm text-lg leading-none hover:bg-[#F4F4F5]"
            aria-label="Close profile editor"
          >
            &times;
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium">Add photo</p>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            className="relative mt-2 block size-24 overflow-hidden rounded-full"
            aria-label="Choose profile photo"
          >
            <Image
              className="size-24 object-cover"
              src={draftAvatarUrl}
              alt=""
              width={96}
              height={96}
              unoptimized={draftAvatarUrl.startsWith("blob:")}
              aria-hidden="true"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="flex size-7 items-center justify-center rounded-full bg-black/70">
                <Image src="/camera.svg" alt="" width={15} height={12} />
              </span>
            </span>
          </button>
        </div>

        <label htmlFor="profileName" className="mt-5 block text-sm font-medium">
          Name
        </label>
        <input
          id="profileName"
          value={draftName}
          onChange={(event) => setDraftName(event.target.value)}
          className="mt-2 h-10 w-full rounded-md border border-[#E4E4E7] px-3 text-sm outline-none focus:border-[#18181B]"
        />

        <label htmlFor="profileAbout" className="mt-4 block text-sm font-medium">
          About
        </label>
        <textarea
          id="profileAbout"
          value={draftAbout}
          onChange={(event) => setDraftAbout(event.target.value)}
          className="mt-2 h-26 w-full resize-none rounded-md border border-[#E4E4E7] p-3 text-sm outline-none focus:border-[#18181B]"
        />

        <label
          htmlFor="profileSocialUrl"
          className="mt-4 block text-sm font-medium"
        >
          Social media URL
        </label>
        <input
          id="profileSocialUrl"
          value={draftSocialUrl}
          onChange={(event) => setDraftSocialUrl(event.target.value)}
          className="mt-2 h-10 w-full rounded-md border border-[#E4E4E7] px-3 text-sm outline-none focus:border-[#18181B]"
        />

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-md bg-[#F4F4F5] px-4 text-sm font-medium hover:bg-[#E4E4E7]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 rounded-md bg-[#18181B] px-4 text-sm font-medium text-white hover:bg-[#27272A]"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
