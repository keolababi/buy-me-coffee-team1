"use client";

import { useRef, useState } from "react";

type Props = { onAvatarChange: (url: string) => void };

export default function PersonalInfo({ onAvatarChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(
    "https://ui-avatars.com/api/?name=Jake&background=random",
  );
  const [name, setName] = useState("Jake");
  const [about, setAbout] = useState(
    "I'm a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along.",
  );
  const [socialUrl, setSocialUrl] = useState(
    "https://buymeacoffee.com/baconpancakes1",
  );
  const [saved, setSaved] = useState(false);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onAvatarChange(url);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <section className="border border-gray-200 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">
        Personal Info
      </h2>

      <div className="mb-5">
        <p className="text-sm text-gray-500 mb-2">Add photo</p>
        <div className="relative w-20 h-20">
          <img
            src={preview}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 rounded-full bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhoto}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">About</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={4}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:border-gray-400 transition-colors"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm text-gray-600 mb-1">
          Social media URL
        </label>
        <input
          value={socialUrl}
          onChange={(e) => setSocialUrl(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
      >
        {saved ? "Saved ✓" : "Save changes"}
      </button>
    </section>
  );
}
