"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordSection() {
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!newPw) return setError("Enter a new password");
    if (newPw !== confirmPw) return setError("Passwords do not match");
    if (newPw.length < 8)
      return setError("Password must be at least 8 characters");
    setError("");
    setSaved(true);
    setNewPw("");
    setConfirmPw("");
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <section className="border border-gray-200 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">
        Set a new password
      </h2>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">New password</label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            value={newPw}
            onChange={(e) => {
              setNewPw(e.target.value);
              setError("");
            }}
            placeholder="Enter new password"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors pr-10"
          />
          <button
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            {showNew ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Confirm password
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPw}
            onChange={(e) => {
              setConfirmPw(e.target.value);
              setError("");
            }}
            placeholder="Confirm password"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors pr-10"
          />
          <button
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            {showConfirm ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      <button
        onClick={handleSave}
        className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
      >
        {saved ? "Saved ✓" : "Save changes"}
      </button>
    </section>
  );
}
