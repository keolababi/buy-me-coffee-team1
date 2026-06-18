"use client";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";

interface DonationCompleteProps {
  creator: {
    name: string;
    avatarUrl?: string | null;
    successMessage?: string | null;
  };
}

export function DonationComplete({ creator }: DonationCompleteProps) {
  const message =
    creator.successMessage ??
    "Thank you for supporting me! It means a lot to have your support. It's a step toward creating a more inclusive and accepting community of artists.";
  const router = useRouter();
  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center gap-5 px-4'>
      <div className='w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center'>
        <svg
          className='w-7 h-7 text-white'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2.5}
            d='M5 13l4 4L19 7'
          />
        </svg>
      </div>

      <h1 className='text-xl font-semibold'>Donation Complete !</h1>

      <div className='border border-gray-200 rounded-xl p-4 max-w-sm w-full flex gap-3'>
        <Avatar
          name={creator.name}
          url={creator.avatarUrl ?? null}
          size={36}
        />
        <div>
          <p className='text-sm font-medium mb-1'>{creator.name}:</p>
          <p className='text-sm text-gray-500 leading-relaxed'>{message}</p>
        </div>
      </div>

      <button
        type='button'
        onClick={() => router.push("/explore")}
        className='bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors'
      >
        Return to explore
      </button>
    </div>
  );
}
