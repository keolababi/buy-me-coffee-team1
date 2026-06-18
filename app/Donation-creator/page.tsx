"use client";

import { useState } from "react";

type Supporter = {
  name: string;
  amount: string;
  coffees: number;
  message: string;
  avatarColor: string;
};

const supporters: Supporter[] = [
  {
    name: "Sarah Thompson",
    amount: "$10",
    coffees: 2,
    message:
      "Thank you for sharing your creative work. Your posts always make my day better!",
    avatarColor: "bg-[#A3E635]",
  },
  {
    name: "Michael Brown",
    amount: "$5",
    coffees: 1,
    message: "Keep going. Excited to see what you create next.",
    avatarColor: "bg-[#C084FC]",
  },
  {
    name: "Alex Johnson",
    amount: "$15",
    coffees: 3,
    message:
      "Your work has helped me learn a lot. This coffee is a small thank you.",
    avatarColor: "bg-[#22D3EE]",
  },
];

export default function DonationCreatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [name, setName] = useState("Jake");
  const [about, setAbout] = useState(
    "I'm a digital creator who enjoys sharing content, design, and ideas."
  );
  const [socialUrl, setSocialUrl] = useState("https://buymeacoffee.com/jake");
  const [message, setMessage] = useState("");

  const hasSupporters = supporters.length > 0;

  return (
    <main className="min-h-screen bg-white text-[#09090B]">
      <header className="h-14 border-b border-[#E4E4E7] bg-white">
        <div className="mx-auto flex h-full max-w-300 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-[#14B8A6] text-xs font-bold text-white">
              B
            </div>
            <span className="text-sm font-semibold">Buy Me Coffee</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop')] bg-cover bg-center" />
            <span className="text-sm font-medium">{name}</span>
          </div>
        </div>
      </header>

      <section className="relative h-55 bg-[#55C3A6]">
        <button className="absolute right-6 top-4 rounded-md border border-[#E4E4E7] bg-white px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-[#F4F4F5]">
          Change cover
        </button>
      </section>

      <section className="relative mx-auto -mt-10 grid max-w-300 grid-cols-1 gap-6 px-6 pb-16 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <section className="rounded-md border border-[#E4E4E7] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop')] bg-cover bg-center" />
                <h1 className="text-base font-semibold">{name}</h1>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-md border border-[#E4E4E7] px-3 py-1.5 text-xs font-medium hover:bg-[#F4F4F5]"
              >
                Edit page
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <section>
                <h2 className="text-sm font-semibold">About {name}</h2>
                <p className="mt-2 text-xs leading-5 text-[#71717A]">
                  {about}
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold">Social media URL</h2>
                <p className="mt-2 text-xs text-[#71717A]">{socialUrl}</p>
              </section>
            </div>
          </section>

          <section className="rounded-md border border-[#E4E4E7] bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold">Recent supporters</h2>

            {!hasSupporters ? (
              <div className="mt-3 flex h-30 flex-col items-center justify-center rounded-md border border-[#E4E4E7]">
                <div className="text-lg">&#9829;</div>
                <p className="mt-2 text-xs font-medium">
                  Be the first one to support {name}
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-5">
                {supporters.map((supporter) => (
                  <article key={supporter.name} className="flex gap-3">
                    <div
                      className={`size-8 shrink-0 rounded-full ${supporter.avatarColor}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold">
                          {supporter.name}
                        </p>
                        <p className="text-xs font-medium">
                          {supporter.amount}
                        </p>
                      </div>
                      <p className="text-xs text-[#71717A]">
                        Bought {supporter.coffees}{" "}
                        {supporter.coffees === 1 ? "coffee" : "coffees"}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#52525B]">
                        {supporter.message}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-md border border-[#E4E4E7] bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold">Buy {name} a Coffee</h2>

          <div className="mt-4">
            <p className="text-xs font-medium">Select amount:</p>

            <div className="mt-2 flex items-center gap-2">
              {[1, 2, 5].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    selectedAmount === amount
                      ? "border-[#09090B] bg-[#09090B] text-white"
                      : "border-[#E4E4E7] bg-white hover:bg-[#F4F4F5]"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-medium">Special message</label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-2 h-24 w-full resize-none rounded-md border border-[#E4E4E7] p-3 text-sm outline-none transition-colors placeholder:text-[#A1A1AA] focus:border-[#09090B]"
              placeholder="Write your message here..."
            />
          </div>

          <button className="mt-4 w-full rounded-md bg-[#D4D4D8] py-2 text-sm font-medium text-white">
            Support
          </button>
        </aside>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-110 rounded-md bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold">Edit profile</h2>
                <p className="mt-1 text-xs leading-5 text-[#71717A]">
                  Make changes to your profile here. Click save when you are
                  done.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="flex size-7 items-center justify-center rounded-md text-lg leading-none hover:bg-[#F4F4F5]"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="mt-5">
              <div className="size-24 rounded-full bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop')] bg-cover bg-center" />
            </div>

            <label className="mt-4 block text-xs font-medium">Name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-md border border-[#E4E4E7] p-2 text-sm outline-none focus:border-[#09090B]"
              placeholder="Your name"
            />

            <label className="mt-4 block text-xs font-medium">About</label>
            <textarea
              value={about}
              onChange={(event) => setAbout(event.target.value)}
              className="mt-2 h-24 w-full resize-none rounded-md border border-[#E4E4E7] p-2 text-sm outline-none focus:border-[#09090B]"
              placeholder="Tell supporters about yourself"
            />

            <label className="mt-4 block text-xs font-medium">
              Social media URL
            </label>
            <input
              value={socialUrl}
              onChange={(event) => setSocialUrl(event.target.value)}
              className="mt-2 w-full rounded-md border border-[#E4E4E7] p-2 text-sm outline-none focus:border-[#09090B]"
              placeholder="https://example.com"
            />

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md border border-[#E4E4E7] px-4 py-2 text-sm font-medium hover:bg-[#F4F4F5]"
              >
                Cancel
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md bg-[#09090B] px-4 py-2 text-sm font-medium text-white hover:bg-[#27272A]"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
