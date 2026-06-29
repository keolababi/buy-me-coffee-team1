import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/home-dashboard"
      className="flex items-center gap-2 text-sm font-semibold text-zinc-950"
    >
      <Image src="/coffee.svg" alt="" width={20} height={20} />
      <span>Buy Me Coffee</span>
    </Link>
  );
}
