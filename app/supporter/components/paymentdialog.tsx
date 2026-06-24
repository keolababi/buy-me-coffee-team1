"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CardDetails, CardForm } from "./Cardform";
import { MethodTabs, PaymentMethod } from "./PaymnetmethodTabs";
import { QPayPanel } from "./Qrmodal";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmitCard: (card: CardDetails) => void;
  onConfirmQPay?: () => void;
  qrImageUrl?: string;
  targetUrl?: string;
  amount?: number;
}

export function PaymentDialog({
  open,
  onClose,
  onSubmitCard,
  onConfirmQPay,
  qrImageUrl,
  targetUrl,
  amount,
}: PaymentDialogProps) {
  const [method, setMethod] = useState<PaymentMethod>("card");

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'
      onClick={onClose}
    >
      <div
        className='relative w-full max-w-md rounded-2xl bg-white p-6'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label='Close'
          className='absolute right-5 top-5 text-gray-400 hover:text-gray-600'
        >
          <X size={18} />
        </button>

        <MethodTabs
          value={method}
          onChange={setMethod}
        />

        {method === "card" ?
          <CardForm onContinue={onSubmitCard} />
        : <QPayPanel
            qrImageUrl={qrImageUrl}
            targetUrl={targetUrl}
            amount={amount}
            onConfirm={onConfirmQPay}
          />
        }
      </div>
    </div>
  );
}
