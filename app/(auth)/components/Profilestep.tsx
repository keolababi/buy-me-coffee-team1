"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import type { ProfileData } from "../me/page";

type Props = {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
  onNext: () => void;
};

type Errors = Partial<Record<keyof ProfileData, string>>;

export default function ProfileStep({ data, onChange, onNext }: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange({ ...data, photo: file });
    setPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, photo: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!data.photo) next.photo = "Зураг оруулна уу";
    if (!data.name.trim()) next.name = "Нэр оруулна уу";
    if (!data.about.trim()) next.about = "Танилцуулга оруулна уу";
    if (!data.socialUrl.trim()) next.socialUrl = "Social URL оруулна уу";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    if (validate()) onNext();
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8">
      <h1 className="text-xl font-medium text-gray-900 mb-1">Профайл бөглөх</h1>
      <p className="text-sm text-gray-400 mb-6">Танилцуулгаа бэлтгэнэ үү</p>

      {/* Photo upload */}
      <div className="mb-6">
        <label className="block text-sm text-gray-500 mb-2">Зураг нэмэх</label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={`w-[72px] h-[72px] rounded-full border-2 border-dashed flex items-center justify-center transition-colors overflow-hidden ${
            errors.photo
              ? "border-red-400"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {preview ? (
            <img
              src={preview}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="w-5 h-5 text-gray-400" />
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhoto}
        />
        {errors.photo && (
          <p className="mt-1 text-xs text-red-500">{errors.photo}</p>
        )}
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1.5">Нэр</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => {
            onChange({ ...data, name: e.target.value });
            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
          }}
          placeholder="Нэрээ оруулна уу"
          className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-gray-400 ${
            errors.name ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* About */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1.5">
          Танилцуулга
        </label>
        <textarea
          value={data.about}
          onChange={(e) => {
            onChange({ ...data, about: e.target.value });
            if (errors.about) setErrors((p) => ({ ...p, about: undefined }));
          }}
          placeholder="Өөрийн тухай бичнэ үү"
          rows={4}
          className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none resize-none transition-colors focus:border-gray-400 ${
            errors.about ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.about && (
          <p className="mt-1 text-xs text-red-500">{errors.about}</p>
        )}
      </div>

      {/* Social URL */}
      <div className="mb-6">
        <label className="block text-sm text-gray-500 mb-1.5">
          Social media URL
        </label>
        <input
          type="text"
          value={data.socialUrl}
          onChange={(e) => {
            onChange({ ...data, socialUrl: e.target.value });
            if (errors.socialUrl)
              setErrors((p) => ({ ...p, socialUrl: undefined }));
          }}
          placeholder="https://"
          className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-gray-400 ${
            errors.socialUrl ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.socialUrl && (
          <p className="mt-1 text-xs text-red-500">{errors.socialUrl}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
        >
          Үргэлжлүүлэх →
        </button>
      </div>
    </div>
  );
}
