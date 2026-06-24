"use client";

import { useMemo, useState } from "react";
import Sidebar from "../account/components/Sidebar";

type Transaction = {
  id: number;
  initials?: string;
  avatar?: "pink" | "ocean";
  name: string;
  url: string;
  message: string;
  amount: 1 | 2 | 5 | 10;
  time: string;
};

const publicUrl = "buymeacoffee.com/baconpancakes1";
const amounts = [1, 2, 5, 10] as const;

const transactions: Transaction[] = [
  {
    id: 1,
    initials: "CN",
    name: "Guest",
    url: "instagram.com/welesley",
    message:
      "Thank you for being so awesome everyday! You always manage to brighten up my day when I'm feeling down. Although $1 isn't that much money it's all I can contribute at the moment",
    amount: 1,
    time: "10 hours ago",
  },
  {
    id: 2,
    avatar: "pink",
    name: "John Doe",
    url: "buymeacoffee.com/bdsadas",
    message: "Thank you for being so awesome everyday!",
    amount: 10,
    time: "10 hours ago",
  },
  {
    id: 3,
    initials: "CN",
    name: "Radicals",
    url: "buymeacoffee.com/gkfgrew",
    message: "",
    amount: 2,
    time: "10 hours ago",
  },
  {
    id: 4,
    avatar: "pink",
    name: "Guest",
    url: "facebook.com/penelopeb",
    message: "",
    amount: 5,
    time: "10 hours ago",
  },
  {
    id: 5,
    avatar: "ocean",
    name: "Fan1",
    url: "buymeacoffee.com/supporterone",
    message:
      "Thank you for being so awesome everyday! You always manage to brighten up my day when I'm feeling down. Although $1 isn't that much money it's all I can contribute at the moment. When I become successful I will be sure to buy you many coffees and keep supporting your creative work.",
    amount: 10,
    time: "10 hours ago",
  },
  {
    id: 6,
    initials: "CN",
    name: "Guest",
    url: "instagram.com/welesley",
    message: "",
    amount: 1,
    time: "10 hours ago",
  },
];

const navItems = [
  { label: "Home", active: true },
  { label: "Explore", active: false },
  { label: "View page", active: false, external: true },
  { label: "Account settings", active: false },
];

function CoffeeIcon() {
  return (
    <svg
      width='20'
      height='20'
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

function CopyIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <rect
        x='9'
        y='9'
        width='11'
        height='11'
        rx='2'
        stroke='currentColor'
        strokeWidth='2'
      />
      <path
        d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
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

function ExternalLinkIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5'
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
      width='28'
      height='28'
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function Avatar({
  size = "md",
  variant = "pink",
  initials,
}: {
  size?: "sm" | "md" | "lg";
  variant?: "pink" | "ocean";
  initials?: string;
}) {
  const sizeClass = {
    sm: "size-10 text-sm",
    md: "size-12 text-base",
    lg: "size-14 text-lg",
  }[size];

  if (initials) {
    return (
      <div
        className={`${sizeClass} grid shrink-0 place-items-center rounded-full bg-[#F4F4F5] font-normal text-[#18181B]`}
      >
        {initials}
      </div>
    );
  }

  const gradient =
    variant === "ocean" ?
      "from-[#031A2E] via-[#0F6B83] to-[#C9542A]"
    : "from-[#F472B6] via-[#8B5CF6] to-[#F97316]";

  return (
    <div
      className={`${sizeClass} relative shrink-0 overflow-hidden rounded-full bg-gradient-to-br ${gradient}`}
    >
      <div className='absolute left-1/2 top-[20%] size-[34%] -translate-x-1/2 rounded-full bg-[#F9D5BC]' />
      <div className='absolute bottom-[15%] left-1/2 h-[42%] w-[62%] -translate-x-1/2 rounded-t-full bg-[#312E81]' />
      <div className='absolute left-[29%] top-[35%] size-[13%] rounded-full border border-[#111827] bg-[#93C5FD]' />
      <div className='absolute right-[29%] top-[35%] size-[13%] rounded-full border border-[#111827] bg-[#93C5FD]' />
    </div>
  );
}

export default function HomeDashboardClient() {
  const [period, setPeriod] = useState("Last 30 days");
  const [amountMenuOpen, setAmountMenuOpen] = useState(false);
  const [selectedAmounts, setSelectedAmounts] = useState<number[]>([
    1, 2, 5, 10,
  ]);
  const [copied, setCopied] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [expandedTransactions, setExpandedTransactions] = useState<number[]>(
    [],
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) =>
        selectedAmounts.includes(transaction.amount),
      ),
    [selectedAmounts],
  );

  const toggleAmount = (amount: number) => {
    setSelectedAmounts((current) =>
      current.includes(amount) ?
        current.filter((item) => item !== amount)
      : [...current, amount].sort((a, b) => a - b),
    );
  };

  const toggleTransaction = (id: number) => {
    setExpandedTransactions((current) =>
      current.includes(id) ?
        current.filter((transactionId) => transactionId !== id)
      : [...current, id],
    );
  };

  const sharePage = async () => {
    try {
      await navigator.clipboard.writeText(`https://${publicUrl}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className='min-h-screen bg-white text-[#09090B]'>
      <header className='flex h-[72px] items-center justify-between px-[7.2%]'>
        <div className='flex items-center gap-2.5 text-[#09090B]'>
          <CoffeeIcon />
          <span className='text-base font-bold tracking-[-0.01em]'>
            Buy Me Coffee
          </span>
        </div>

        <div className='relative'>
          <button
            onClick={() => setProfileMenuOpen((open) => !open)}
            className='flex items-center gap-2.5 rounded-full px-2 py-1 text-sm font-medium text-[#09090B]'
            aria-expanded={profileMenuOpen}
            aria-haspopup='menu'
          >
            <Avatar
              size='sm'
              variant='ocean'
            />
            <span>Jake</span>
            <ChevronDownIcon />
          </button>

          {profileMenuOpen && (
            <div
              role='menu'
              className='absolute right-0 top-[calc(100%+8px)] z-20 w-36 rounded-md border border-[#E4E4E7] bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.12)]'
            >
              <a
                href='/login'
                role='menuitem'
                className='block rounded-md px-3 py-2 text-sm font-medium leading-5 text-[#09090B] hover:bg-[#F4F4F5]'
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </header>

      <div className='grid grid-cols-1 gap-8 px-5 pb-16 pt-12 md:grid-cols-[260px_minmax(0,1fr)] md:px-[7.2%] lg:gap-[72px]'>
        <aside className='md:pt-[21px]'>
          {/* <nav className="flex gap-2 overflow-x-auto md:block md:space-y-3 md:overflow-visible">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex h-10 min-w-fit items-center gap-2 rounded-md px-4 text-sm transition-colors md:w-full ${
                  item.active
                    ? "bg-[#F4F4F5] text-[#09090B]"
                    : "text-[#09090B] hover:bg-[#FAFAFA]"
                }`}
              >
                <span>{item.label}</span>
                {item.external && <ExternalLinkIcon />}
              </a>
            ))}
          </nav> */}
          <Sidebar />
        </aside>

        <section className='min-w-0 md:max-w-[955px]'>
          <section className='rounded-lg border border-[#E4E4E7] bg-white px-6 py-6 md:px-8'>
            <div className='flex flex-col gap-5 border-b border-[#E4E4E7] pb-7 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-4'>
                <Avatar
                  size='lg'
                  variant='pink'
                />
                <div>
                  <h1 className='text-base font-bold leading-5'>Jake</h1>
                  <p className='mt-1 text-sm leading-5 text-[#18181B]'>
                    {publicUrl}
                  </p>
                </div>
              </div>

              <button
                onClick={sharePage}
                className='inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#18181B] px-4 text-sm font-medium text-white transition hover:bg-[#27272A]'
              >
                <CopyIcon />
                {copied ? "Copied" : "Share page link"}
              </button>
            </div>

            <div className='pt-7'>
              <div className='flex flex-wrap items-center gap-4'>
                <h2 className='text-xl font-bold leading-7'>Earnings</h2>
                <label className='relative'>
                  <select
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    className='h-10 w-[183px] appearance-none rounded-md border border-[#E4E4E7] bg-white px-4 pr-10 text-sm text-[#09090B] outline-none'
                  >
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>All-time</option>
                  </select>
                  <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#09090B]'>
                    <ChevronDownIcon />
                  </span>
                </label>
              </div>
              <p className='mt-8 text-[40px] font-extrabold leading-none tracking-[-0.03em]'>
                $450
              </p>
            </div>
          </section>

          <section className='mt-8'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-base font-bold leading-6'>
                Recent transactions
              </h2>

              <div className='relative'>
                <button
                  onClick={() => setAmountMenuOpen((open) => !open)}
                  className='inline-flex h-10 min-w-[115px] items-center justify-center gap-2 rounded-md border border-dashed border-[#E4E4E7] bg-white px-4 text-sm text-[#18181B]'
                >
                  <ChevronDownIcon />
                  Amount
                </button>

                {amountMenuOpen && (
                  <div className='absolute right-0 z-10 mt-2 w-36 rounded-md border border-[#E4E4E7] bg-white p-2 shadow-lg'>
                    {amounts.map((amount) => (
                      <label
                        key={amount}
                        className='flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-[#F4F4F5]'
                      >
                        <input
                          type='checkbox'
                          checked={selectedAmounts.includes(amount)}
                          onChange={() => toggleAmount(amount)}
                          className='size-4 accent-[#18181B]'
                        />
                        ${amount}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className='rounded-lg border border-[#E4E4E7] bg-white'>
              {filteredTransactions.length === 0 ?
                <div className='flex min-h-[190px] flex-col items-center justify-center px-6 py-9 text-center'>
                  <div className='grid size-[68px] place-items-center rounded-full bg-[#F4F4F5] text-[#09090B]'>
                    <HeartIcon />
                  </div>
                  <p className='mt-6 text-base font-bold'>
                    You don&apos;t have any supporters yet
                  </p>
                  <p className='mt-2 text-base text-[#3F3F46]'>
                    Share your page with your audience to get started.
                  </p>
                </div>
              : <div className='px-9 py-7'>
                  {filteredTransactions.map((transaction) => {
                    const canExpand = transaction.id === 5;
                    const isExpanded = expandedTransactions.includes(
                      transaction.id,
                    );
                    const message =
                      canExpand && !isExpanded ?
                        `${transaction.message.slice(0, 214)}...`
                      : transaction.message;

                    return (
                      <article
                        key={transaction.id}
                        className='grid grid-cols-[40px_minmax(0,1fr)_74px] gap-4 py-3 first:pt-0 last:pb-0'
                      >
                        <Avatar
                          size='sm'
                          initials={transaction.initials}
                          variant={transaction.avatar}
                        />
                        <div className='min-w-0'>
                          <h3 className='text-sm font-semibold leading-5'>
                            {transaction.name}
                          </h3>
                          <p className='mt-0.5 text-xs leading-4 text-[#18181B]'>
                            {transaction.url}
                          </p>
                          {transaction.message && (
                            <p className='mt-4 text-sm leading-5 text-[#18181B]'>
                              {message}
                              {canExpand && (
                                <button
                                  onClick={() =>
                                    toggleTransaction(transaction.id)
                                  }
                                  className='ml-1 font-semibold underline underline-offset-2'
                                >
                                  {isExpanded ? "Show less" : "Show more"}
                                </button>
                              )}
                            </p>
                          )}
                        </div>
                        <div className='text-right'>
                          <p className='text-base font-bold leading-5'>
                            + ${transaction.amount}
                          </p>
                          <p className='mt-2 text-xs leading-4 text-[#71717A]'>
                            {transaction.time}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              }
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
