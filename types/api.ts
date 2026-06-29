export type ProfileSummary = {
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
};

export type CurrentUser = {
  id: number;
  email: string;
  username: string;
  profile: ProfileSummary;
  bankCard: {
    country: string;
    firstName: string;
    lastName: string;
    lastFour: string;
    expiryDate: string;
  } | null;
};

export type Creator = {
  id: number;
  username: string;
  profile: Pick<
    ProfileSummary,
    "name" | "about" | "avatarImage" | "socialMediaURL"
  >;
};

export type Donation = {
  id: number;
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeCoffee: string;
  createdAt: string;
  donor: {
    username: string;
    name: string;
    avatarImage: string;
  };
};

export type DashboardStats = {
  generatedAt: string;
  user: Omit<CurrentUser, "bankCard">;
  donations: Donation[];
  totalEarnings: number;
  supporterCount: number;
};

export type ApiError = { error: string };
