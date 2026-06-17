"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ─── GET /donation/received/:userId ──────────────────────────────────────────
export async function getReceivedDonations(userId: number, take = 3, skip = 0) {
  const [donations, total] = await Promise.all([
    prisma.donation.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" },
      take,
      skip,
      include: {
        donor: {
          select: { id: true, name: true, avatarUrl: true },
        },
      },
    }),
    prisma.donation.count({ where: { recipientId: userId } }),
  ]);

  return { donations, total };
}

// ─── GET /donation/total-earnings/:userId ─────────────────────────────────────
export async function getTotalEarnings(userId: number) {
  const result = await prisma.donation.aggregate({
    where: { recipientId: userId },
    _sum: { amount: true },
  });

  return result._sum.amount ?? 0;
}

// ─── GET /donation/search-donations/:userId ───────────────────────────────────
export async function searchDonations(userId: number, query: string) {
  return prisma.donation.findMany({
    where: {
      recipientId: userId,
      OR: [
        { specialMessage: { contains: query, mode: "insensitive" } },
        { socialURLOrBuyMeACoffee: { contains: query, mode: "insensitive" } },
        { donor: { name: { contains: query, mode: "insensitive" } } },
      ],
    },
    orderBy: { createdAt: "desc" },
    include: {
      donor: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });
}

// ─── POST /donation/create-donation ──────────────────────────────────────────
export async function createDonation(data: {
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donorId: number;
  recipientId: number;
}) {
  const donation = await prisma.donation.create({
    data: {
      amount: data.amount,
      specialMessage: data.specialMessage,
      socialURLOrBuyMeACoffee: data.socialURLOrBuyMeACoffee,
      donorId: data.donorId,
      recipientId: data.recipientId,
    },
    include: {
      recipient: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          thankYouMessage: true,
        },
      },
      donor: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });

  revalidatePath(`/creator/${data.recipientId}`);
  return donation;
}
