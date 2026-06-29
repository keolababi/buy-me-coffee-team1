import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      username: true,
      Profile: {
        select: {
          name: true,
          about: true,
          avatarImage: true,
          socialMediaURL: true,
        },
      },
    },
  });

  return NextResponse.json(
    users.map(({ Profile, ...user }) => ({ ...user, profile: Profile })),
  );
}
