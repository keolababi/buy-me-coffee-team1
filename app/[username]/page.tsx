"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  type ProfileDetails,
  ProfileEditModal,
} from "@/app/components/ProfileEditModal";
import { DonationComplete } from "./components/DonationComplete";
import { CoverImageUploader } from "@/app/components/CoverImageUploader";
import { Avatar } from "./components/Avatar";
import { RecentSupporters } from "./components/RecentSupporters";
import { DonationForm } from "./components/DonationForm";
import { PaymentDialog } from "./components/paymentdialog";
import { MOCK_CREATORS, MOCK_LOGGED_IN_USERNAME } from "@/lib/mockdata";

type Supporter = {
  id: string;
  supporterName: string;
  supporterAvatarUrl: string | null;
  amount: number;
  specialMessage: string | null;
  createdAt: Date;
};

const getSupporterName = (url: string) => {
  try {
    const normalizedUrl = url.includes("://") ? url : `https://${url}`;
    const parsedUrl = new URL(normalizedUrl);
    const pathName = parsedUrl.pathname.split("/").filter(Boolean)[0];
    const name = pathName || parsedUrl.hostname.split(".")[0];
    return name
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  } catch {
    return "Guest";
  }
};

export default function ProfilePage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  // This is the line that replaces the manual toggle —
  // it derives owner/visitor from the URL instead of a button.
  const isOwner = username === MOCK_LOGGED_IN_USERNAME;

  const creatorRecord = MOCK_CREATORS.find((c) => c.username === username);

  const [profile, setProfile] = useState<ProfileDetails>(
    creatorRecord ?? MOCK_CREATORS[0],
  );
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [pendingDonation, setPendingDonation] = useState<{
    url: string;
    amount: number;
    message: string;
  } | null>(null);

  if (!creatorRecord) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-[#71717A]">
          No creator found for "{username}"
        </p>
      </main>
    );
  }

  const handleSupportTrigger = (
    amount: number,
    url: string,
    message: string,
  ) => {
    setPendingDonation({ url, amount, message });
  };

  const handleDonationConfirm = async () => {
    if (!pendingDonation) return;
    const { url, amount, message } = pendingDonation;
    setPendingDonation(null);
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    setSupporters((prev) => [
      {
        id: Date.now().toString(),
        supporterName: getSupporterName(url),
        supporterAvatarUrl: null,
        amount,
        specialMessage: message.trim() || null,
        createdAt: new Date(),
      },
      ...prev,
    ]);

    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <DonationComplete
        creator={{ name: profile.name, avatarUrl: profile.avatarUrl }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      <header className="h-16 border-b border-[#E4E4E7] bg-white">
        <div className="mx-auto flex h-full max-w-300 items-center justify-between px-6">
          <Link href="/home-dashboard">
            <div className="flex items-center gap-2">
              <Image
                src="/coffee.svg"
                alt="Coffee logo"
                width={24}
                height={24}
              />
              <p className="text-base font-semibold">Buy Me Coffee</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-md px-3 py-2">
            <Image
              className="size-10 rounded-full"
              src={profile.avatarUrl}
              alt="Viewer profile picture"
              width={40}
              height={40}
              unoptimized={profile.avatarUrl.startsWith("blob:")}
            />
            <span className="text-sm font-medium">
              {isOwner ? profile.name : MOCK_LOGGED_IN_USERNAME}
            </span>
            <button className="inline-flex size-6 items-center justify-center rounded-xs hover:bg-[#E4E4E7]">
              <Image
                src="/chevron-down.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </header>

      {isOwner ? (
        <CoverImageUploader />
      ) : (
        <div className="h-64 w-full bg-[#F4F4F5]" />
      )}

      <section className="relative z-10 mx-auto -mt-20 grid max-w-270 grid-cols-1 gap-6 px-6 pb-16 lg:grid-cols-[1fr_520px]">
        <div className="space-y-6">
          <section className="rounded-md border border-[#E4E4E7] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-[#E4E4E7] pb-6">
              <div className="flex items-center gap-3">
                <Avatar name={profile.name} url={profile.avatarUrl} size={48} />
                <p className="text-xl font-bold">{profile.name}</p>
              </div>

              {isOwner && (
                <button
                  type="button"
                  onClick={() => setIsProfileEditorOpen(true)}
                  className="rounded-md bg-[#F4F4F5] px-4 py-2 text-sm font-medium hover:bg-[#E4E4E7]"
                >
                  Edit page
                </button>
              )}
            </div>

            <section className="pt-6">
              <h2 className="text-base font-semibold">About {profile.name}</h2>
              <p className="mt-5 text-sm leading-5">{profile.about}</p>
            </section>
          </section>

          <section className="rounded-md border border-[#E4E4E7] bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold">Social media URL</h2>
            <p className="mt-5 text-sm">{profile.socialUrl}</p>
          </section>

          <RecentSupporters
            supporters={supporters}
            creatorName={profile.name}
          />
        </div>

        <DonationForm
          creatorName={profile.name}
          loading={loading}
          onSupport={handleSupportTrigger}
        />
      </section>

      {isOwner && isProfileEditorOpen && (
        <ProfileEditModal
          profile={profile}
          onClose={() => setIsProfileEditorOpen(false)}
          onSave={(updatedProfile) => {
            setProfile(updatedProfile);
            setIsProfileEditorOpen(false);
          }}
        />
      )}

      <PaymentDialog
        open={!!pendingDonation}
        onClose={() => setPendingDonation(null)}
        amount={pendingDonation?.amount}
        targetUrl={pendingDonation?.url}
        onSubmitCard={handleDonationConfirm}
        onConfirmQPay={handleDonationConfirm}
      />
    </main>
  );
}
