"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ExternalLink, Settings } from "lucide-react";

const NAV = [
  { label: "Home", href: "/home-dashboard", icon: Home },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "View page", href: "/profile", icon: ExternalLink, external: true },
  { label: "Account settings", href: "/account", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-44 shrink-0">
      <nav className="flex flex-col gap-1">
        {NAV.map(({ label, href, icon: Icon, external }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {external && (
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
