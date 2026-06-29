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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const card = await prisma.bankCard.findUnique({
      where: { userId },
      select: {
        firstName: true,
        lastName: true,
        cardNumber: true,
        expiryDate: true,
      },
    });

    if (!card) {
      return NextResponse.json({ error: "No card found" }, { status: 404 });
    }

    return NextResponse.json({
      name: `${card.firstName} ${card.lastName}`,
      cardNumber: card.cardNumber,
      expiryMonth: String(new Date(card.expiryDate).getMonth() + 1).padStart(
        2,
        "0",
      ),
      expiryYear: String(new Date(card.expiryDate).getFullYear()),
    });
  } catch (err) {
    console.error("[card GET]", err);
    return NextResponse.json(
      { error: "Failed to fetch card" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { country, firstName, lastName, cardNumber, expiryDate } =
      await req.json();

    if (!country || !firstName || !lastName || !cardNumber || !expiryDate) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Upsert — update if exists, create if not
    const card = await prisma.bankCard.upsert({
      where: { userId },
      update: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate: new Date(expiryDate),
        updatedAt: new Date(),
      },
      create: {
        userId,
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate: new Date(expiryDate),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, card });
  } catch (err) {
    console.error("[card POST]", err);
    return NextResponse.json({ error: "Failed to save card" }, { status: 500 });
  }
}
