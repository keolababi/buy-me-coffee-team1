"use client";

import Image from "next/image";
import { useState } from "react";
import { CoverImageUploader } from "../components/CoverImageUploader";
import {
  type ProfileDetails,
  ProfileEditModal,
} from "../components/ProfileEditModal";

const amounts = [1, 2, 5, 10];
const initialProfile: ProfileDetails = {
  name: "Jake",
  about:
    "I'm a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along.",
  socialUrl: "https://buymeacoffee.com/spacerulz44",
  avatarUrl: "/PFP.svg",
};

type Supporter = {
  id: number;
  name: string;
  amount: number;
  message: string;
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

export default function DonationCreatorPage() {
  const [profile, setProfile] = useState(initialProfile);
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [socialUrl, setSocialUrl] = useState("");
  const [message, setMessage] = useState("");
  const [hasTouchedSocialUrl, setHasTouchedSocialUrl] = useState(false);
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const canSupport = socialUrl.trim() !== "";
  const hasSocialUrlError = hasTouchedSocialUrl && socialUrl.trim() === "";
  const [showAllSupporters, setShowAllSupporters] = useState(false);

  const handleSupport = () => {
    if (!canSupport) {
      setHasTouchedSocialUrl(true);
      return;
    }

    setSupporters((currentSupporters) => [
      {
        id: Date.now(),
        name: getSupporterName(socialUrl),
        amount: selectedAmount,
        message: message.trim(),
        avatarURL: profile.avatarUrl,
      },
      ...currentSupporters,
    ]);
    setSocialUrl("");
    setMessage("");
    setHasTouchedSocialUrl(false);
  };

  const VisibleSupporters = showAllSupporters
    ? supporters
    : supporters.slice(0, 4);
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      <header className="h-16 border-b border-[#E4E4E7] bg-white">
        <div className="mx-auto flex h-full max-w-300 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Image src="/coffee.svg" alt="Coffee logo" width={24} height={24} />
            <p className="text-base font-semibold">Buy Me Coffee</p>
          </div>
          
          <div className="flex items-center gap-2 rounded-md px-3 py-2 ">
            <Image
              className="size-10 rounded-full"
              src={profile.avatarUrl}
              alt={`${profile.name} profile picture`}
              width={40}
              height={40}
              unoptimized={profile.avatarUrl.startsWith("blob:")}
            />
            <span className="text-sm font-medium">{profile.name}</span>
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

      <CoverImageUploader />

      <section className="relative z-10 mx-auto -mt-20 grid max-w-270 grid-cols-1 gap-6 px-6 pb-16 lg:grid-cols-[1fr_520px]">
        <div className="space-y-6">
          <section className="rounded-md border border-[#E4E4E7] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-[#E4E4E7] pb-6">
              <div className="flex items-center gap-3">
                <Image
                  className="size-12 rounded-full"
                  src={profile.avatarUrl}
                  alt={`${profile.name} profile picture`}
                  width={48}
                  height={48}
                  unoptimized={profile.avatarUrl.startsWith("blob:")}
                />
                <p className="text-xl font-bold">{profile.name}</p>
              </div>

              <button
                type="button"
                onClick={() => setIsProfileEditorOpen(true)}
                className="rounded-md bg-[#F4F4F5] px-4 py-2 text-sm font-medium hover:bg-[#E4E4E7]"
              >
                Edit page
              </button>
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

          <section className="rounded-md border border-[#E4E4E7] bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold">Recent Supporters</h2>
            {supporters.length > 0 ? (
              <div className="mt-5 space-y-5">
                {VisibleSupporters.map((supporter) => (
                  <article key={supporter.id} className="flex gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F4F4F5] text-sm font-semibold">
                      {supporter.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-5">
                        <span className="font-semibold">{supporter.name}</span>{" "}
                        bought ${supporter.amount} coffee
                      </p>
                      {supporter.message && (
                        <p className="mt-2 text-sm leading-5">
                          {supporter.message}
                        </p>
                      )}
                    </div>
                  </article>
                ))}

                {supporters.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setShowAllSupporters((current) => !current)}
                    className="mt-5 h-10 w-full rounded-md border border-[#E4E4E7] text-sm font-medium hover:bg-[#F4F4F5]"
                    >
                      {showAllSupporters ? "See less" : "See more"}
                    </button>
                )}
              </div>
            ) : (
              <div className="mt-5 flex min-h-36 flex-col items-center justify-center rounded-lg border border-[#E4E4E7] bg-white p-6 text-center">
                <Image
                  src="/heart.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
                <p className="mt-3 text-base font-semibold leading-6">
                  Be the first one to support {profile.name}
                </p>
              </div>
            )}
          </section>
        </div>

      
        <aside className="h-fit rounded-md border border-[#E4E4E7] bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Buy {profile.name} a Coffee</h1>

          <div className="mt-6">
            <p className="text-sm font-medium">Select amount:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors ${
                    selectedAmount === amount
                      ? "border-[#18181B] bg-white"
                      : "border-transparent bg-[#F4F4F5] hover:bg-[#E4E4E7]"
                  }`}
                >
                  <Image
                    src="/coffee.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          <label
            htmlFor="socialUrl"
            className="mt-6 block text-sm font-medium"
          >
            Enter BuyMeCoffee or social account URL:
          </label>
          <input
            id="socialUrl"
            value={socialUrl}
            onChange={(event) => setSocialUrl(event.target.value)}
            onBlur={() => setHasTouchedSocialUrl(true)}
            aria-invalid={hasSocialUrlError}
            aria-describedby={
              hasSocialUrlError ? "socialUrl-error" : undefined
            }
            className={`mt-2 h-10 w-full rounded-md border px-3 text-sm outline-none placeholder:text-[#71717A] ${
              hasSocialUrlError
                ? "border-[#DC2626] focus:border-[#DC2626]"
                : "border-[#E4E4E7] focus:border-[#18181B]"
            }`}
            placeholder="buymeacoffee.com/"
          />
          {hasSocialUrlError && (
            <p id="socialUrl-error" className="mt-2 text-xs text-[#DC2626]">
              Social account URL is required.
            </p>
          )}

          <label htmlFor="message" className="mt-6 block text-sm font-medium">
            Special message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-2 h-29 w-full resize-none rounded-md border border-[#E4E4E7] p-3 text-sm outline-none placeholder:text-[#71717A] focus:border-[#18181B]"
            placeholder="Please write your message here"
          />

          <button
            type="button"
            onClick={handleSupport}
            disabled={!canSupport}
            className={`mt-7 w-full rounded-md py-2.5 text-sm font-medium text-white transition-colors ${
              canSupport
                ? "bg-[#18181B] hover:bg-[#27272A]"
                : "cursor-not-allowed bg-[#D4D4D8]"
            }`}
          >
            Support
          </button>
        </aside>
      </section>
      {isProfileEditorOpen && (
        <ProfileEditModal
          profile={profile}
          onClose={() => setIsProfileEditorOpen(false)}
          onSave={(updatedProfile) => {
            setProfile(updatedProfile);
            setIsProfileEditorOpen(false);
          }}
        />
      )}
    </main>
  );
}
