"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CardDetails, CardForm } from "./Cardform";
import { MethodTabs, PaymentMethod } from "./PaymentMethodTab";
import { QPayPanel } from "./Qrmodal";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmitCard: (card: CardDetails) => void;
  onConfirmQPay?: () => void;
  amount?: number;
}

export function PaymentDialog({
  open,
  onClose,
  onSubmitCard,
  onConfirmQPay,
  amount,
}: PaymentDialogProps) {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [paid, setPaid] = useState(false);

  // Generate QR when QPay tab is selected
  useEffect(() => {
    if (!open || method !== "qpay" || !amount) return;

    setGenerating(true);
    setQrCodeUrl("");
    setTransactionId(null);
    setPaid(false);

    fetch("/api/payment/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setQrCodeUrl(data.qrCodeUrl);
        setTransactionId(data.transactionId);
      })
      .catch(console.error)
      .finally(() => setGenerating(false));
  }, [open, method, amount]);

  // Poll transaction status after QR is shown
  useEffect(() => {
    if (!transactionId || paid) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/payment/status?transactionId=${transactionId}`,
        );
        const data = await res.json();
        if (data.status === "COMPLETED") {
          setPaid(true);
          clearInterval(interval);
          onConfirmQPay?.();
        }
      } catch {
        // keep polling
      }
    }, 2000); // check every 2 seconds

    return () => clearInterval(interval);
  }, [transactionId, paid, onConfirmQPay]);

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      setMethod("card");
      setQrCodeUrl("");
      setTransactionId(null);
      setPaid(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <MethodTabs value={method} onChange={setMethod} />

        {method === "card" ? (
          <CardForm onContinue={onSubmitCard} />
        ) : (
          <QPayPanel
            qrCodeUrl={qrCodeUrl}
            generating={generating}
            amount={amount}
          />
        )}
      </div>
    </div>
  );
}
