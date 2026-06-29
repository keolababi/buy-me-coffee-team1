"use client";

import Image from "next/image";
import { useState } from "react";

export function Avatar({
  name,
  url,
  size = 48,
}: {
  name: string;
  url: string | null;
  size?: number;
}) {
  const [hasError, setHasError] = useState(false);

  const isValidUrl =
    url &&
    url.trim() !== "" &&
    (url.startsWith("/") ||
      url.startsWith("http://") ||
      url.startsWith("https://"));

  if (isValidUrl && !hasError) {
    const isLocal = url.startsWith("/uploads/");
    return (
      <Image
        src={url}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
        unoptimized={isLocal}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-emerald-500 flex items-center justify-center text-black font-medium flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {name ? name.charAt(0).toUpperCase() : "?"}
    </div>
  );
}
