import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";

export async function POST(request: Request) {
  const { amount } = await request.json();

  const transaction = await prisma.transaction.create({
    data: { amount, status: "PENDING" },
  });

  // Get the base URL from your .env file
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Construct the URL dynamically
  const mockPaymentUrl = `${baseUrl}/pay/${transaction.id}`;

  const qrCodeUrl = await QRCode.toDataURL(mockPaymentUrl);

  return NextResponse.json({
    transactionId: transaction.id,
    qrCodeUrl,
    mockPaymentUrl,
  });
}
