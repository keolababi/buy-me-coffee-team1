import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Creator } from "@/types/api";
import { UserAvatar } from "./UserAvatar";

export function CreatorCard({ creator }: { creator: Creator }) {
  const { profile } = creator;

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar
            name={profile.name || creator.username}
            src={profile.avatarImage}
          />
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-zinc-950">
              {profile.name || creator.username}
            </h2>
            <p className="truncate text-sm text-zinc-500">
              @{creator.username}
            </p>
          </div>
        </div>
        <Link
          href={`/${encodeURIComponent(creator.username)}`}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md bg-zinc-100 px-4 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
        >
          View profile
          <ExternalLink className="size-4" />
        </Link>
      </div>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-zinc-950">
            About {profile.name || creator.username}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-5 text-zinc-600">
            {profile.about || "This creator has not added a bio yet."}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-950">Social link</h3>
          <p className="mt-2 break-words text-sm leading-5 text-zinc-600">
            {profile.socialMediaURL || "No social link added"}
          </p>
        </div>
      </div>
    </article>
  );
}
