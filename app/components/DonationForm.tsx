"use client";

import { useState } from "react";
import { CoffeeIcon } from "../Icons/CoffeeIcon";
import { DonationAmount, DonationFormData } from "@/types";

interface DonationFormProps {
  creatorName: string;
  onSubmit: (data: DonationFormData) => void;
  loading?: boolean;
}

const AMOUNTS: DonationAmount[] = [1, 2, 5, 10];

export function DonationForm({
  creatorName,
  onSubmit,
  loading = false,
}: DonationFormProps) {
  const [amount, setAmount] = useState<DonationAmount>(5);
  const [socialURLOrBuyMeACoffee, setSocialURL] = useState("");
  const [specialMessage, setSpecialMessage] = useState("");

  const isValid =
    socialURLOrBuyMeACoffee.trim().length > 0 &&
    specialMessage.trim().length > 0;

  function handleSubmit() {
    if (!isValid || loading) return;
    onSubmit({ amount, socialURLOrBuyMeACoffee, specialMessage });
  }

  return (
    <div className='donation-form-card'>
      <h2 className='donation-title'>Buy {creatorName} a Coffee</h2>

      {/* Amount selector */}
      <div className='amount-section'>
        <label className='field-label'>Select amount:</label>
        <div className='amount-buttons'>
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type='button'
              onClick={() => setAmount(a)}
              className={`amount-btn ${amount === a ? "amount-btn--active" : ""}`}
            >
              <CoffeeIcon />
              <span>${a}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Social URL */}
      <div className='field-section'>
        <label
          className='field-label'
          htmlFor='social-url'
        >
          Enter BuyMeCoffee or social account URL:
        </label>
        <input
          id='social-url'
          type='text'
          className='field-input'
          placeholder='buymeacoffee.com/'
          value={socialURLOrBuyMeACoffee}
          onChange={(e) => setSocialURL(e.target.value)}
        />
      </div>

      {/* Special message */}
      <div className='field-section'>
        <label
          className='field-label'
          htmlFor='special-message'
        >
          Special message:
        </label>
        <textarea
          id='special-message'
          className='field-textarea'
          placeholder='Please write your message here'
          value={specialMessage}
          onChange={(e) => setSpecialMessage(e.target.value)}
          rows={4}
        />
      </div>

      <button
        type='button'
        onClick={handleSubmit}
        disabled={!isValid || loading}
        className={`support-btn ${isValid && !loading ? "support-btn--active" : "support-btn--disabled"}`}
      >
        {loading ? "Processing…" : "Support"}
      </button>
    </div>
  );
}
