"use client";

interface DonationCompleteProps {
  creator: {
    name: string;
    avatarUrl?: string | null;
    thankYouMessage?: string | null;
  };
  onReturn: () => void;
}

export function DonationComplete({ creator, onReturn }: DonationCompleteProps) {
  const message =
    creator.thankYouMessage ??
    "Thank you for supporting me! It means a lot to have your support. It's a step toward creating a more inclusive and accepting community of artists.";

  return (
    <div className='complete-screen'>
      <div className='complete-icon'>
        <svg
          width='28'
          height='28'
          viewBox='0 0 24 24'
          fill='none'
          stroke='white'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='20 6 9 17 4 12' />
        </svg>
      </div>

      <h2 className='complete-title'>Donation Complete !</h2>

      <div className='creator-message-card'>
        <div className='creator-message-header'>
          {creator.avatarUrl ?
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              className='creator-avatar-sm'
            />
          : <div className='creator-avatar-sm creator-avatar-placeholder'>
              {creator.name[0]}
            </div>
          }
          <span className='creator-message-name'>{creator.name}:</span>
        </div>
        <p className='creator-message-text'>{message}</p>
      </div>

      <button
        className='return-btn'
        onClick={onReturn}
      >
        Return to explore
      </button>
    </div>
  );
}
