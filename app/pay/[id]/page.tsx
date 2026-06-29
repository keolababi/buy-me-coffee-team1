"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Added hook import

type Status = "processing" | "success" | "error";

export default function PayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("processing");

  useEffect(() => {
    let cancelled = false;

    const recipientId = searchParams.get("recipientId");
    const specialMessage = searchParams.get("specialMessage");
    const socialURLOrBuyMeCoffee = searchParams.get("socialURLOrBuyMeCoffee");
    const donorId = searchParams.get("donorId");

    const completePayment = async () => {
      try {
        const res = await fetch("/api/payment/webhook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Updated: Passes along all parameters to the webhook
          body: JSON.stringify({
            transactionId: id,
            paymentType: "QPAY",
            recipientId: recipientId ? Number(recipientId) : null,
            specialMessage: specialMessage || "",
            socialURLOrBuyMeCoffee: socialURLOrBuyMeCoffee || "",
            donorId: donorId ? Number(donorId) : 1,
          }),
        });
        if (!res.ok) throw new Error("Webhook failed");
        if (!cancelled) setStatus("success");
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    completePayment();
    return () => {
      cancelled = true;
    };
  }, [id, searchParams]); // Added searchParams to the dependency array

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {status === "processing" && (
        <>
          <div className="h-12 w-12 mb-4 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin" />
          <p className="text-gray-600">Confirming your payment…</p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="h-16 w-16 mb-4 rounded-full bg-green-100 flex items-center justify-center text-3xl text-green-600">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Payment successful
          </h1>
          <p className="mt-2 text-gray-600">Thank you for your support!</p>
        </>
      )}

      {status === "error" && (
        <>
          <div className="h-16 w-16 mb-4 rounded-full bg-red-100 flex items-center justify-center text-3xl text-red-600">
            ✕
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Payment failed</h1>
          <p className="mt-2 text-gray-600">
            We couldn&apos;t confirm this payment. Please try again.
          </p>
        </>
      )}
    </div>
  );
}
