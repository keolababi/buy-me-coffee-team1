import Image from "next/image";

export function Avatar({
  name,
  url,
  size = 48,
}: {
  name: string;
  url: string | null;
  size?: number;
}) {
  if (url) {
    return (
      <Image
        src={url}
        alt={name}
        width={size}
        height={size}
        className='rounded-full object-cover'
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className='rounded-full bg-emerald-500 flex items-center justify-center text-black font-medium flex-shrink-0'
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
