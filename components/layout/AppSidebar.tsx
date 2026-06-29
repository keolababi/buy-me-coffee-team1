"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

const items = [
  { label: "Home", href: "/home-dashboard" },
  { label: "Explore", href: "/explore" },
  { label: "Account settings", href: "/account" },
];

export function AppSidebar({ username }: { username: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 md:w-44">
      <nav className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`h-10 min-w-fit rounded-md px-3 text-sm leading-10 transition-colors ${
              pathname === item.href
                ? "bg-zinc-100 font-medium text-zinc-950"
                : "text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={`/${encodeURIComponent(username)}`}
          target="_blank"
          className="flex h-10 min-w-fit items-center gap-2 rounded-md px-3 text-sm text-zinc-700 hover:bg-zinc-50"
        >
          View page <ExternalLink className="size-3.5" />
        </Link>
      </nav>
    </aside>
  );
}
