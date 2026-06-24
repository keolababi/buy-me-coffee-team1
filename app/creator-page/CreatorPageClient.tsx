"use client";

import { useMemo, useState } from "react";
import spaceCover from "./space-cover.png";
import Link from "next/link";

type Supporter = {
  id: number;
  name: string;
  amount: number;
  message?: string;
  avatar: "initials" | "green" | "ocean" | "pink";
};

const creator = {
  name: "Space ranger",
  socialUrl: "https://buymeacoffee.com/spacerulz44",
  supportUrl: "buymeacoffee.com/baconpancakes1",
  about:
    "All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.",
};

const supporters: Supporter[] = [
  {
    id: 1,
    name: "Guest",
    amount: 1,
    avatar: "initials",
    message:
      "Thank you for being so awesome everyday! You always manage to brighten up my day when I'm feeling down. Although $1 isn't that much money it's all I can contribute at the moment.",
  },
  {
    id: 2,
    name: "John Doe",
    amount: 5,
    avatar: "green",
    message: "Thank you for being so awesome everyday!",
  },
  {
    id: 3,
    name: "Jake",
    amount: 10,
    avatar: "ocean",
  },
  {
    id: 4,
    name: "Guest",
    amount: 2,
    avatar: "pink",
    message:
      "Thank you for being so awesome everyday! You always manage to brighten up my day when I'm feeling down. Although $1 isn't that much money it's all I can contribute at the moment. When I become successful I will be sure to buy you more gifts and donations. Thank you again.",
  },
  {
    id: 5,
    name: "Radicals",
    amount: 5,
    avatar: "initials",
    message: "Appreciate the calm reporting and clear notes.",
  },
  {
    id: 6,
    name: "Fan1",
    amount: 10,
    avatar: "ocean",
    message: "Keep the project alive. This page is a favorite.",
  },
];

const amounts = [1, 2, 5, 10];

function CoffeeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8ZM6 2v2M10 2v2M14 2v2'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='m6 9 6 6 6-6'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z' />
    </svg>
  );
}

function CreatorAvatar({ size = "lg" }: { size?: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "size-[54px]" : "size-10";

  return (
    <div
      className={`${sizeClass} relative shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#E0F2FE] via-[#2563EB] to-[#020617]`}
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_47%_45%,rgba(255,255,255,0.95)_0_10%,transparent_11%),radial-gradient(circle_at_50%_52%,rgba(0,0,0,0.9)_0_18%,transparent_19%),radial-gradient(circle_at_50%_62%,rgba(96,165,250,0.95)_0_29%,transparent_30%)]' />
      <div className='absolute inset-x-[18%] bottom-[12%] h-[34%] rounded-t-full bg-[#0F172A]' />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className='relative size-11 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#031A2E] via-[#0F6B83] to-[#C9542A]'>
      <div className='absolute left-1/2 top-[20%] size-[34%] -translate-x-1/2 rounded-full bg-[#F9D5BC]' />
      <div className='absolute bottom-[15%] left-1/2 h-[42%] w-[62%] -translate-x-1/2 rounded-t-full bg-[#312E81]' />
      <div className='absolute left-[29%] top-[35%] size-[13%] rounded-full border border-[#111827] bg-[#93C5FD]' />
      <div className='absolute right-[29%] top-[35%] size-[13%] rounded-full border border-[#111827] bg-[#93C5FD]' />
    </div>
  );
}

function SupporterAvatar({ avatar }: { avatar: Supporter["avatar"] }) {
  if (avatar === "initials") {
    return (
      <div className='grid size-10 shrink-0 place-items-center rounded-full bg-[#F4F4F5] text-base text-[#09090B]'>
        CN
      </div>
    );
  }

  const gradients = {
    green: "from-[#84CC16] via-[#16A34A] to-[#F97316]",
    ocean: "from-[#031A2E] via-[#0F6B83] to-[#C9542A]",
    pink: "from-[#F472B6] via-[#8B5CF6] to-[#F97316]",
  };

  return (
    <div
      className={`relative size-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br ${gradients[avatar]}`}
    >
      <div className='absolute left-1/2 top-[20%] size-[34%] -translate-x-1/2 rounded-full bg-[#F9D5BC]' />
      <div className='absolute bottom-[15%] left-1/2 h-[42%] w-[62%] -translate-x-1/2 rounded-t-full bg-[#312E81]' />
    </div>
  );
}

function SpaceCover() {
  return (
    <div
      className='h-[318px] w-full bg-[#050713]'
      style={{
        backgroundImage: `url(${spaceCover.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  );
}

export default function CreatorPageClient() {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [supportUrl, setSupportUrl] = useState(creator.supportUrl);
  const [message, setMessage] = useState(
    "Thank you for being so awesome everyday!",
  );

  const visibleSupporters = useMemo(
    () => (showAll ? supporters : supporters.slice(0, 4)),
    [showAll],
  );

  return (
    <main className='min-h-screen bg-white text-[#09090B]'>
      <header className='relative z-10 flex h-[72px] items-center justify-between bg-white px-[7.2%]'>
        <Link href={"/home-dashboard"}>
          <div className='flex items-center gap-2.5 text-[#09090B]'>
            <CoffeeIcon />
            <span className='text-base font-bold tracking-[-0.01em]'>
              Buy Me Coffee
            </span>
          </div>
        </Link>
        <button className='flex items-center gap-3 rounded-full px-2 py-1 text-sm font-medium text-[#09090B]'>
          <UserAvatar />
          <span>Jake</span>
          <ChevronDownIcon />
        </button>
      </header>

      <SpaceCover />

      <section className='mx-auto grid max-w-[1180px] gap-6 px-6 pb-24 lg:grid-cols-2'>
        <div className='-mt-[86px] space-y-5'>
          <section className='rounded-lg border border-[#E4E4E7] bg-white px-6 py-6'>
            <div className='flex items-center gap-4'>
              <CreatorAvatar />
              <h1 className='text-2xl font-bold leading-8'>{creator.name}</h1>
            </div>

            <div className='mt-6 border-t border-[#E4E4E7] pt-8'>
              <h2 className='text-base font-bold leading-6'>
                About {creator.name}
              </h2>
              <p className='mt-5 text-sm leading-5 text-[#09090B]'>
                {creator.about}
              </p>
            </div>
          </section>

          <section className='rounded-lg border border-[#E4E4E7] bg-white px-6 py-7'>
            <h2 className='text-base font-bold leading-6'>Social media URL</h2>
            <p className='mt-6 text-sm leading-5 text-[#09090B]'>
              {creator.socialUrl}
            </p>
          </section>

          <section className='rounded-lg border border-[#E4E4E7] bg-white px-6 py-7'>
            <h2 className='text-base font-bold leading-6'>Recent Supporters</h2>

            {supporters.length === 0 ?
              <div className='mt-4 flex min-h-[116px] flex-col items-center justify-center rounded-md border border-[#E4E4E7] text-center'>
                <div className='text-[#09090B]'>
                  <HeartIcon />
                </div>
                <p className='mt-4 text-sm font-bold'>
                  Be the first one to support Jake
                </p>
              </div>
            : <>
                <div className='mt-5 space-y-5'>
                  {visibleSupporters.map((supporter) => (
                    <article
                      key={supporter.id}
                      className='grid grid-cols-[40px_minmax(0,1fr)] gap-4'
                    >
                      <SupporterAvatar avatar={supporter.avatar} />
                      <div>
                        <p className='text-sm font-bold leading-5'>
                          {supporter.name} bought ${supporter.amount} coffee
                        </p>
                        {supporter.message && (
                          <p className='mt-3 max-w-[530px] text-sm leading-5 text-[#09090B]'>
                            {supporter.message}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  onClick={() => setShowAll((current) => !current)}
                  className='mt-6 flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#E4E4E7] bg-white text-sm font-medium hover:bg-[#FAFAFA]'
                >
                  {showAll ? "See less" : "See more"}
                  <ChevronDownIcon />
                </button>
              </>
            }
          </section>
        </div>

        <aside className='-mt-[86px]'>
          <section className='rounded-lg border border-[#E4E4E7] bg-white px-6 py-7'>
            <h2 className='text-[26px] font-bold leading-8'>
              Buy {creator.name} a Coffee
            </h2>

            <div className='mt-8'>
              <p className='text-sm font-medium leading-5'>Select amount:</p>
              <div className='mt-2 flex flex-wrap gap-3'>
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium ${
                      selectedAmount === amount ? "bg-[#E4E4E7]" : (
                        "bg-[#F4F4F5] hover:bg-[#E4E4E7]"
                      )
                    }`}
                  >
                    <CoffeeIcon size={16} />${amount}
                  </button>
                ))}
              </div>
            </div>

            <label className='mt-8 block'>
              <span className='text-sm font-medium leading-5'>
                Enter BuyMeCoffee or social account URL:
              </span>
              <input
                value={supportUrl}
                onChange={(event) => setSupportUrl(event.target.value)}
                className='mt-2 h-11 w-full rounded-md border border-[#E4E4E7] px-4 text-sm outline-none focus:border-[#A1A1AA]'
              />
            </label>

            <label className='mt-5 block'>
              <span className='text-sm font-medium leading-5'>
                Special message:
              </span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className='mt-2 min-h-[142px] w-full resize-none rounded-md border border-[#E4E4E7] px-4 py-3 text-sm outline-none focus:border-[#A1A1AA]'
              />
            </label>

            <button className='mt-8 h-11 w-full rounded-md bg-[#18181B] text-sm font-medium text-white hover:bg-[#27272A]'>
              Support
            </button>
          </section>
        </aside>
      </section>
    </main>
  );
}
