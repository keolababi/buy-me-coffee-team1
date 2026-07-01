// app/api/payment/generate/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";

export async function POST(request: Request) {
  const {
    amount,
    specialMessage,
    socialURLOrBuyMeCoffee,
    recipientId,
    donorId,
  } = await request.json();

  const transaction = await prisma.transaction.create({
    data: { amount, status: "PENDING", paymentType: "QPAY" },
  });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const paymentUrl = `https://l2m1xn26-3001.asse.devtunnels.ms//pay/${transaction.id}?recipientId=${recipientId}&specialMessage=${encodeURIComponent(specialMessage || "")}&socialURLOrBuyMeCoffee=${encodeURIComponent(socialURLOrBuyMeCoffee || "")}&donorId=${donorId || 1}`;

  const qrCodeUrl = await QRCode.toDataURL(paymentUrl);

  return NextResponse.json({
    transactionId: transaction.id,
    qrCodeUrl,
    paymentUrl,
  });
}
