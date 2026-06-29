// app/api/payment/webhook/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    transactionId,
    paymentType,
    recipientId,
    specialMessage,
    socialURLOrBuyMeCoffee,
    donorId,
  } = await request.json();

  // 1. Update transaction status
  const updatedTransaction = await prisma.transaction.update({
    where: { id: transactionId },
    data: { status: "COMPLETED", paymentType: paymentType ?? "QPAY" },
  });

  // 2. CRITICAL: Create the record in the Donation table so it shows on the UI!
  if (recipientId) {
    await prisma.donation.create({
      data: {
        amount: Math.round(updatedTransaction.amount), // Prisma schema expects an Int for amount
        specialMessage: specialMessage || "",
        socialURLOrBuyMeCoffee: socialURLOrBuyMeCoffee || "",
        donorId: Number(donorId) || 1, // fallback to a default system user if anonymous
        recipientId: Number(recipientId),
        updatedAt: new Date(),
      },
    });
  }

  return NextResponse.json({ success: true, transaction: updatedTransaction });
}
