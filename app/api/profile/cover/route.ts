import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
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

export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filename = `cover-${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    await writeFile(join(uploadDir, filename), buffer);

    const coverImageUrl = `/uploads/${filename}`;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileId: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.profile.update({
      where: { id: user.profileId },
      data: { backgroundImage: coverImageUrl },
    });

    return NextResponse.json({ coverImageUrl });
  } catch (err) {
    console.error("[cover upload]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileId: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.profile.update({
      where: { id: user.profileId },
      data: { backgroundImage: "" },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[cover delete]", err);
    return NextResponse.json(
      { error: "Failed to remove cover" },
      { status: 500 },
    );
  }
}
