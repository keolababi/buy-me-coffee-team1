"use client";

import { useState } from "react";

export default function SuccessPage() {
  const [message, setMessage] = useState(
    "Thank you for supporting me! It means a lot to have your support. It's a step toward creating a more inclusive and accepting community of artists.",
  );
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <section className="border border-gray-200 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">Success page</h2>

      <div className="mb-5">
        <label className="block text-sm text-gray-600 mb-1">
          Confirmation message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:border-gray-400 transition-colors"
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
