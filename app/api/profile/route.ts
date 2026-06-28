import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

function getUserId(req: NextRequest): number | null {
  const token =
    req.headers.get("authorization")?.replace("Bearer ", "") ||
    req.cookies.get("token")?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId ?? null;
}

export async function GET(req: NextRequest) {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Нэвтрээгүй байна" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { Profile: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Хэрэглэгч олдсонгүй" },
        { status: 404 },
      );
    }

    return NextResponse.json(user.Profile);
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
    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Нэвтрээгүй байна" }, { status: 401 });
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
    });

    if (!user) {
      return NextResponse.json(
        { error: "Хэрэглэгч олдсонгүй" },
        { status: 404 },
      );
    }

    const updatedProfile = await prisma.profile.update({
      where: { id: user.profileId },
      data: {
        name: name ?? "",
        about: about ?? "",
        avatarImage: avatarImage ?? "",
        socialMediaURL: socialMediaURL ?? "",
        backgroundImage: backgroundImage ?? "",
        successMessage: successMessage ?? "",
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
