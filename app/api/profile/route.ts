import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { Profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      ...user.Profile,
      username: user.username,
    });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json(
      { error: "Internal server problem" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      about,
      avatarImage,
      socialMediaURL,
      backgroundImage,
      successMessage,
    } = body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileId: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedProfile = await prisma.profile.update({
      where: { id: user.profileId },
      data: {
        ...(name !== undefined && { name }),
        ...(about !== undefined && { about }),
        ...(avatarImage !== undefined && { avatarImage }),
        ...(socialMediaURL !== undefined && { socialMediaURL }),
        ...(backgroundImage !== undefined && { backgroundImage }),
        ...(successMessage !== undefined && { successMessage }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json(
      { error: "Internal server problem" },
      { status: 500 },
    );
  }
}
