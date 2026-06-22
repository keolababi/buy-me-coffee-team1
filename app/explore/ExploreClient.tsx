"use client";

import { useMemo, useState } from "react";

type Creator = {
  id: number;
  name: string;
  aboutTitle: string;
  about: string;
  url: string;
  avatar: "space" | "purple" | "alien" | "teams" | "dragon";
};

const creators: Creator[] = [
  {
    id: 1,
    name: "Space ranger",
    aboutTitle: "About Space ranger",
    about:
      "All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about cl...",
    url: "https://buymeacoffee.com/baconpancakes1",
    avatar: "space",
  },
  {
    id: 2,
    name: "Purple monster",
    aboutTitle: "About Purple monster",
    about:
      "Purple monster is for everyone. It handles all the painful experiences and helps people.",
    url: "https://buymeacoffee.com/ifmonster23",
    avatar: "purple",
  },
  {
    id: 3,
    name: "Alien Conspiracy",
    aboutTitle: "About Alien Conspiracy",
    about:
      "Show your support ♥ and buy me a coffee! & keep project a live!",
    url: "https://buymeacoffee.com/roooaaaamm",
    avatar: "alien",
  },
  {
    id: 4,
    name: "Teams",
    aboutTitle: "About Teams",
    about:
      "Joel 1:14 \"Sanctify a fast, call a solemn assembly, gather the elders and all the inhabitants of the land. Cry out to the LORD.\"My purpose is clear: To seek God's face, every Thursday for all my Subscribers to align with His will, and to step into th...",
    url: "https://buymeacoffee.com/kaka0",
    avatar: "teams",
  },
  {
    id: 5,
    name: "Dragons1",
    aboutTitle: "About Dragons1",
    about: "Hello",
    url: "https://buymeacoffee.com/dragons1",
    avatar: "dragon",
  },
];

const navItems = [
  { label: "Home", active: false },
  { label: "Explore", active: true },
  { label: "View page", active: false, external: true },
  { label: "Account settings", active: false },
];

function CoffeeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8ZM6 2v2M10 2v2M14 2v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m21 21-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 21a8 8 0 1 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CreatorAvatar({ variant }: { variant: Creator["avatar"] }) {
  const backgrounds = {
    space: "from-[#0F172A] via-[#2563EB] to-[#E0F2FE]",
    purple: "from-[#F59E0B] via-[#7C3AED] to-[#111827]",
    alien: "from-[#111827] via-[#DC2626] to-[#7F1D1D]",
    teams: "from-[#0369A1] via-[#0F766E] to-[#111827]",
    dragon: "from-[#FDE047] via-[#F97316] to-[#16A34A]",
  };

  return (
    <div
      className={`relative size-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br ${backgrounds[variant]}`}
    >
      <div className="absolute inset-x-[27%] top-[18%] h-[32%] rounded-full bg-white/80" />
      <div className="absolute inset-x-[19%] bottom-[13%] h-[42%] rounded-t-full bg-black/75" />
      <div className="absolute left-[23%] top-[37%] size-[15%] rounded-full bg-white/80" />
      <div className="absolute right-[23%] top-[37%] size-[15%] rounded-full bg-white/80" />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#031A2E] via-[#0F6B83] to-[#C9542A]">
      <div className="absolute left-1/2 top-[20%] size-[34%] -translate-x-1/2 rounded-full bg-[#F9D5BC]" />
      <div className="absolute bottom-[15%] left-1/2 h-[42%] w-[62%] -translate-x-1/2 rounded-t-full bg-[#312E81]" />
      <div className="absolute left-[29%] top-[35%] size-[13%] rounded-full border border-[#111827] bg-[#93C5FD]" />
      <div className="absolute right-[29%] top-[35%] size-[13%] rounded-full border border-[#111827] bg-[#93C5FD]" />
    </div>
  );
}

export default function ExploreClient() {
  const [search, setSearch] = useState("");

  const filteredCreators = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return creators;
    }

    return creators.filter((creator) =>
      `${creator.name} ${creator.about} ${creator.url}`
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-white text-[#09090B]">
      <header className="flex h-[72px] items-center justify-between px-[7.25%]">
        <div className="flex items-center gap-2.5 text-[#09090B]">
          <CoffeeIcon />
          <span className="text-base font-bold tracking-[-0.01em]">
            Buy Me Coffee
          </span>
        </div>

        <button className="flex items-center gap-3 rounded-full px-2 py-1 text-sm font-medium text-[#09090B]">
          <UserAvatar />
          <span>Jake</span>
          <ChevronDownIcon />
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8 px-5 pb-20 pt-[55px] md:grid-cols-[260px_minmax(0,1fr)] md:px-[7.25%] lg:gap-[86px]">
        <aside>
          <nav className="flex gap-2 overflow-x-auto md:block md:space-y-3 md:overflow-visible">
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
          </nav>
        </aside>

        <section className="min-w-0 md:max-w-[855px]">
          <h1 className="text-xl font-bold leading-7">Explore creators</h1>

          <label className="relative mt-6 block w-full max-w-[220px]">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]">
              <SearchIcon />
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name"
              className="h-10 w-full rounded-md border border-[#E4E4E7] bg-white pl-10 pr-3 text-sm text-[#09090B] outline-none placeholder:text-[#71717A] focus:border-[#A1A1AA]"
              type="search"
            />
          </label>

          {filteredCreators.length === 0 ? (
            <div className="flex min-h-[570px] flex-col items-center justify-center text-center">
              <div className="grid size-12 place-items-center rounded-full bg-[#F4F4F5] text-[#71717A]">
                <UserIcon />
              </div>
              <p className="mt-5 text-sm font-bold">
                No creators have signed up yet
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {filteredCreators.map((creator) => (
                <article
                  key={creator.id}
                  className="min-h-[164px] rounded-lg border border-[#E4E4E7] bg-white px-6 py-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <CreatorAvatar variant={creator.avatar} />
                      <h2 className="truncate text-xl font-bold leading-7">
                        {creator.name}
                      </h2>
                    </div>

                    <a
                      href={creator.url}
                      className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md bg-[#F4F4F5] px-4 text-sm font-medium text-[#09090B] hover:bg-[#E4E4E7]"
                    >
                      View profile
                      <ExternalLinkIcon />
                    </a>
                  </div>

                  <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.95fr)] md:gap-[72px]">
                    <div>
                      <h3 className="text-base font-bold leading-6">
                        {creator.aboutTitle}
                      </h3>
                      <p className="mt-4 text-sm leading-5 text-[#09090B]">
                        {creator.about}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-bold leading-6">
                        Social media URL
                      </h3>
                      <p className="mt-4 break-words text-sm leading-5 text-[#09090B]">
                        {creator.url}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
