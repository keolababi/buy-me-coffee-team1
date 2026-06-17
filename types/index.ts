export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string | null;
  bio?: string | null;
  socialUrl?: string | null;
  thankYouMessage?: string | null;
}

export interface Donation {
  id: number;
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donorId: number;
  recipientId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DonationWithDonor extends Donation {
  donor: Pick<User, "id" | "name" | "avatarUrl">;
}

export type DonationAmount = 1 | 2 | 5 | 10;

export type DonationStep = "form" | "qr" | "complete";

export interface DonationFormData {
  amount: DonationAmount;
  socialURLOrBuyMeACoffee: string;
  specialMessage: string;
}
