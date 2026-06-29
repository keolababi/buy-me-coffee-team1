import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const editableFields = [
  "name",
  "about",
  "avatarImage",
  "socialMediaURL",
  "backgroundImage",
  "successMessage",
] as const;

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true, Profile: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ ...user.Profile, username: user.username });
}

export async function PATCH(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const data: Partial<Record<(typeof editableFields)[number], string>> = {};
  for (const field of editableFields) {
    if (body[field] !== undefined) {
      if (typeof body[field] !== "string") {
        return NextResponse.json(
          { error: `${field} must be a string` },
          { status: 400 },
        );
      }
      data[field] = body[field].trim();
    }
  }

  if (data.name !== undefined && !data.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileId: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const profile = await prisma.profile.update({
    where: { id: user.profileId },
    data: { ...data, updatedAt: new Date() },
  });

  return NextResponse.json(profile);
}
