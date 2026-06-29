import { Heart } from "lucide-react";

export function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-zinc-100 text-zinc-700">
        {icon ?? <Heart className="size-6" />}
      </div>
      <p className="mt-5 text-sm font-semibold text-zinc-950">{title}</p>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-zinc-500">{description}</p>
      )}
    </div>
  );
}
