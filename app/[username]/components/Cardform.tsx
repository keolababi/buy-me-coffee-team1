"use client";

import { useState, useEffect } from "react";

export interface CardDetails {
  name: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}

interface CardFormProps {
  onContinue: (card: CardDetails) => void;
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.match(/.{1,4}/g)?.join("/") ?? digits;
}

function maskCardNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  const masked = "****" + "****" + "****" + digits.slice(-4);
  return masked.match(/.{1,4}/g)?.join("/") ?? masked;
}

export function CardForm({ onContinue }: CardFormProps) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasCard, setHasCard] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/payment/card", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No card");
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setCardNumber(data.cardNumber);
        setExpiryMonth(data.expiryMonth);
        setExpiryYear(data.expiryYear);
        setHasCard(true);
      })
      .catch(() => setHasCard(false))
      .finally(() => setLoading(false));
  }, []);

  const canContinue =
    name.trim().length > 1 &&
    cardNumber.replace(/\D/g, "").length >= 12 &&
    expiryMonth.length > 0 &&
    expiryYear.length > 0 &&
    cvc.length >= 3;

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm text-black">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        readOnly={hasCard}
        placeholder="First Last"
        className={`mb-4 w-full rounded-lg border px-3 py-2.5 text-sm text-black outline-none ${
          hasCard
            ? "border-gray-100 bg-gray-50 text-gray-500 cursor-default"
            : "border-gray-200 focus:border-gray-400"
        }`}
      />

      <label className="mb-1.5 block text-sm text-black">Card number</label>
      <input
        type="text"
        value={
          hasCard ? maskCardNumber(cardNumber) : formatCardNumber(cardNumber)
        }
        onChange={(e) =>
          !hasCard && setCardNumber(formatCardNumber(e.target.value))
        }
        readOnly={hasCard}
        placeholder="XXXX/XXXX/XXXX/XXXX"
        maxLength={19}
        className={`mb-4 w-full rounded-lg border px-3 py-2.5 text-sm text-black outline-none ${
          hasCard
            ? "border-gray-100 bg-gray-50 text-gray-500 cursor-default"
            : "border-gray-200 focus:border-gray-400"
        }`}
      />

      <div className="mb-6 grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1.5 block text-sm text-black">Expires</label>
          <input
            type="text"
            value={expiryMonth}
            onChange={(e) => !hasCard && setExpiryMonth(e.target.value)}
            readOnly={hasCard}
            placeholder="MM"
            className={`w-full rounded-lg border px-3 py-2.5 text-sm text-black outline-none ${
              hasCard
                ? "border-gray-100 bg-gray-50 text-gray-500 cursor-default"
                : "border-gray-200 focus:border-gray-400"
            }`}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-black">Year</label>
          <input
            type="text"
            value={expiryYear}
            onChange={(e) => !hasCard && setExpiryYear(e.target.value)}
            readOnly={hasCard}
            placeholder="YYYY"
            className={`w-full rounded-lg border px-3 py-2.5 text-sm text-black outline-none ${
              hasCard
                ? "border-gray-100 bg-gray-50 text-gray-500 cursor-default"
                : "border-gray-200 focus:border-gray-400"
            }`}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-black">CVC</label>
          <input
            type="text"
            inputMode="numeric"
            value={cvc}
            onChange={(e) =>
              setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            placeholder="CVC"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-black outline-none focus:border-gray-400"
          />
        </div>
      </div>

      {!hasCard && (
        <p className="mb-4 text-xs text-gray-400">
          No saved card found. Please enter your card details.
        </p>
      )}

      <div className="flex justify-end">
        <button
          onClick={() =>
            onContinue({ name, cardNumber, expiryMonth, expiryYear, cvc })
          }
          disabled={!canContinue}
          className={`rounded-lg px-6 py-2.5 text-sm font-medium ${
            canContinue
              ? "bg-gray-900 text-white hover:bg-gray-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
