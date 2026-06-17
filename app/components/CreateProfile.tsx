"use client";

interface CreatorProfileProps {
  creator: {
    id: string;
    name: string;
    avatarUrl?: string | null;
    bio?: string | null;
    socialUrl?: string | null;
  };
  isOwner?: boolean;
  onEditPage?: () => void;
}

export function CreatorProfile({
  creator,
  isOwner = false,
  onEditPage,
}: CreatorProfileProps) {
  return (
    <div className='profile-card'>
      {/* Header */}
      <div className='profile-header'>
        <div className='profile-header-inner'>
          {creator.avatarUrl ?
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              className='profile-avatar'
            />
          : <div className='profile-avatar profile-avatar-placeholder'>
              {creator.name[0]}
            </div>
          }
          <h1 className='profile-name'>{creator.name}</h1>
        </div>
        {isOwner && (
          <button
            className='edit-page-btn'
            onClick={onEditPage}
          >
            Edit page
          </button>
        )}
      </div>

      {/* Bio */}
      <div className='profile-section'>
        <h3 className='profile-section-title'>About {creator.name}</h3>
        <p className='profile-section-text'>{creator.bio ?? "No bio yet."}</p>
      </div>

      {/* Social URL */}
      {creator.socialUrl && (
        <div className='profile-section'>
          <h3 className='profile-section-title'>Social media URL</h3>
          <a
            href={creator.socialUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='profile-section-link'
          >
            {creator.socialUrl}
          </a>
        </div>
      )}
    </div>
  );
}
