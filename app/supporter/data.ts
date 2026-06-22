export type Creator = {
  id: string;
  name: string;
  username: string;
  bio: string | null;
  socialUrl: string | null;
  avatarUrl: string | null;
  successMessage: string | null;
};

export type Supporter = {
  id: string;
  supporterName: string;
  supporterAvatarUrl: string | null;
  amount: number;
  specialMessage: string | null;
  createdAt: Date;
};

export const MOCK_CREATOR: Creator = {
  id: "1",
  name: "Jake",
  username: "spacerulz44",
  bio: "I'm a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along.",
  socialUrl: "https://buymeacoffee.com/spacerulz44",
  avatarUrl: null,
  successMessage:
    "Thank you for supporting me! It means a lot to have your support. It's a step toward creating a more inclusive and accepting community of artists.",
};
