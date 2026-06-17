"use client";

import { useState } from "react";
import { MOCK_CREATOR, Supporter } from "./data";
import { DonationComplete } from "./components/DonationComplete";
import { Avatar } from "./components/Avatar";
import { RecentSupporters } from "./components/RecentSupporters";
import { DonationForm } from "./components/DonationForm";

export default function SupporterPage() {
  const creator = MOCK_CREATOR;
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showQR, setShowQR] = useState<{
    url: string;
    amount: number;
    message: string;
  } | null>(null); // Business Logic

  const handleSupportTrigger = (
    amount: number,
    url: string,
    message: string,
  ) => {
    setShowQR({ url, amount, message });
  };

  const handleQRConfirm = async () => {
    if (!showQR) return;
    const { url, amount, message } = showQR;

    setShowQR(null);
    setLoading(true); // Fake API Call

    await new Promise((r) => setTimeout(r, 600));

    const newSupporter: Supporter = {
      id: Date.now().toString(),
      supporterName: url.split("/").pop() ?? "Anonymous",
      supporterAvatarUrl: null,
      amount: amount,
      specialMessage: message || null,
      createdAt: new Date(),
    };

    setSupporters((prev) => [newSupporter, ...prev]);
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <DonationComplete creator={creator} onReturn={() => setDone(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-white">
            {/* Banner */}
            <div className="h-36 bg-emerald-400" />     {" "}
      <div className="max-w-4xl mx-auto px-4 pb-12 -mt-16 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-5">
                {/* Left column */}       {" "}
        <div className="flex flex-col gap-4">
                   {" "}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
                       {" "}
            <div className="flex items-center justify-between mb-4">
                           {" "}
              <div className="flex items-center gap-3">
                               {" "}
                <Avatar name={creator.name} url={creator.avatarUrl} size={52} />
                               {" "}
                <span className="text-lg font-medium">{creator.name}</span>     
                       {" "}
              </div>
                           {" "}
              <button className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                                Edit page              {" "}
              </button>
                         {" "}
            </div>
                       {" "}
            <p className="text-sm font-medium mb-1">About {creator.name}</p>   
                   {" "}
            <p className="text-sm text-gray-500 leading-relaxed">
                            {creator.bio}           {" "}
            </p>
                     {" "}
          </div>
                   {" "}
          {creator.socialUrl && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
                           {" "}
              <p className="text-sm font-medium mb-1">Social media URL</p>     
                     {" "}
              <p className="text-sm text-gray-500">{creator.socialUrl}</p>     
                   {" "}
            </div>
          )}
                   {" "}
          <RecentSupporters
            supporters={supporters}
            creatorName={creator.name}
          />
                 {" "}
        </div>
                {/* Right column */}
               {" "}
        <DonationForm
          creatorName={creator.name}
          loading={loading}
          onSupport={handleSupportTrigger}
        />
             {" "}
      </div>
           {" "}
      {/* {showQR && <QRModal url={showQR.url} onClose={handleQRConfirm} />} */}
         {" "}
    </div>
  );
}
