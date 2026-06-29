"use client";

import { Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { CreatorCard } from "@/components/common/CreatorCard";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { apiFetch } from "@/lib/api-client";
import type { Creator, CurrentUser } from "@/types/api";

export default function ExploreClient() {
  const router = useRouter();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<Creator[]>("/api/creators"),
      apiFetch<CurrentUser>("/api/users/me"),
    ])
      .then(([creatorData, userData]) => {
        setCreators(creatorData);
        setUser(userData);
      })
      .catch((reason: unknown) => {
        const message =
          reason instanceof Error ? reason.message : "Unable to load creators.";
        if (message === "Unauthorized") {
          router.replace("/login");
          return;
        }
        setError(message);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const filteredCreators = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return creators;
    return creators.filter(({ username, profile }) =>
      [username, profile.name, profile.about, profile.socialMediaURL]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [creators, search]);

  if (loading) {
    return <PageStatus message="Loading creators…" />;
  }
  if (error || !user) {
    return <PageStatus message={error || "Unable to load your account."} error />;
  }

  return (
    <AppLayout
      user={{
        username: user.username,
        name: user.profile.name,
        avatarImage: user.profile.avatarImage,
      }}
    >
      <PageHeader
        title="Explore creators"
        description="Discover people you can support."
      />
      <label className="relative mt-6 block max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search creators"
          className="h-10 w-full rounded-md border border-zinc-200 pl-9 pr-3 text-sm outline-none focus:border-zinc-400"
        />
      </label>
      {filteredCreators.length ? (
        <div className="mt-6 space-y-4">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-zinc-200">
          <EmptyState
            title={search ? "No creators match your search" : "No creators yet"}
            description={
              search
                ? "Try another name or username."
                : "Creators will appear here after they sign up."
            }
            icon={<Users className="size-6" />}
          />
        </div>
      )}
    </AppLayout>
  );
}

function PageStatus({
  message,
  error = false,
}: {
  message: string;
  error?: boolean;
}) {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <p className={`text-sm ${error ? "text-red-600" : "text-zinc-500"}`}>
        {message}
      </p>
    </main>
  );
}
