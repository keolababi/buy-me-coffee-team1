import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const transactionId = searchParams.get("transactionId");

  if (!transactionId) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const transaction = await prisma.transaction.findUnique({
    // REMOVED parseInt - use the string directly!
    where: { id: transactionId },
    select: { id: true, status: true, amount: true },
  });

  if (!transaction) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(transaction);
}
