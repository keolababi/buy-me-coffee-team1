"use client";

import { useState } from "react";
import { DonationForm } from "./DonationForm";
import { DonationComplete } from "./DonationComplete";
import { createDonation } from "@/actions/donation";
import { QRModal } from "./Qrmodal";
import { DonationFormData, DonationStep } from "@/types";

interface DonationFlowProps {
  creator: {
    id: number;
    name: string;
    avatarUrl?: string | null;
    thankYouMessage?: string | null;
  };
  currentUserId: number;
  onDonationComplete?: () => void;
}

export function DonationFlow({
  creator,
  currentUserId,
  onDonationComplete,
}: DonationFlowProps) {
  const [step, setStep] = useState<DonationStep>("form");
  const [formData, setFormData] = useState<DonationFormData | null>(null);
  const [loading, setLoading] = useState(false);

  function handleFormSubmit(data: DonationFormData) {
    setFormData(data);
    setStep("qr");
  }

  async function handleQRComplete() {
    if (!formData) return;
    setLoading(true);
    try {
      await createDonation({
        amount: formData.amount,
        specialMessage: formData.specialMessage,
        socialURLOrBuyMeACoffee: formData.socialURLOrBuyMeACoffee,
        donorId: currentUserId,
        recipientId: creator.id,
      });
      setStep("complete");
      onDonationComplete?.();
    } finally {
      setLoading(false);
    }
  }

  function handleReturn() {
    setStep("form");
    setFormData(null);
  }

  if (step === "complete") {
    return (
      <DonationComplete
        creator={creator}
        onReturn={handleReturn}
      />
    );
  }

  return (
    <>
      <DonationForm
        creatorName={creator.name}
        onSubmit={handleFormSubmit}
        loading={loading}
      />
      {step === "qr" && formData && (
        <QRModal
          url={formData.socialURLOrBuyMeACoffee}
          onClose={() => setStep("form")}
          onComplete={handleQRComplete}
        />
      )}
    </>
  );
}
