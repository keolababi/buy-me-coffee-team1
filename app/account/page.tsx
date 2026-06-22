"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PersonalInfo from "./components/Personalinfo";
import PasswordSection from "./components/Passwordsection";
import PaymentDetails from "./components/Paymentdetail";
import SuccessPage from "./components/Successpage";

export default function AccountPage() {
  const [avatarUrl, setAvatarUrl] = useState("/avatar-placeholder.jpg");

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <nav className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h.01M12 12h.01M15 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Buy Me Coffee
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-7 h-7 rounded-full object-cover bg-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://ui-avatars.com/api/?name=Jake&background=random";
            }}
          />
          Jake
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </nav>

      <div className="flex max-w-4xl mx-auto px-4 py-8 gap-8">
        <Sidebar />

        <main className="flex-1 space-y-6">
          <h1 className="text-xl font-semibold text-gray-900">My account</h1>
          <PersonalInfo onAvatarChange={setAvatarUrl} />
          <PasswordSection />
          <PaymentDetails />
          <SuccessPage />
        </main>
      </div>
    </div>
  );
}
