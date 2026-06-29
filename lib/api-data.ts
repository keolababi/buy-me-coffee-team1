import type { CurrentUser } from "@/types/api";

type UserWithAccount = {
  id: number;
  email: string;
  username: string;
  Profile: CurrentUser["profile"];
  BankCard: {
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    expiryDate: Date;
  } | null;
};

export function serializeCurrentUser(user: UserWithAccount): CurrentUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    profile: user.Profile,
    bankCard: user.BankCard
      ? {
          country: user.BankCard.country,
          firstName: user.BankCard.firstName,
          lastName: user.BankCard.lastName,
          lastFour: user.BankCard.cardNumber.slice(-4),
          expiryDate: user.BankCard.expiryDate.toISOString(),
        }
      : null,
  };
}
