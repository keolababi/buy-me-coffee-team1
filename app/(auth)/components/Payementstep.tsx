"use client";

import { useState } from "react";
import type { PaymentData } from "../me/page";

type Props = {
  data: PaymentData;
  onChange: (data: PaymentData) => void;
  onBack: () => void;
  onNext: () => void;
};

type Errors = Partial<Record<keyof PaymentData, string>>;

const COUNTRIES = [
  "Mongolia",
  "United States",
  "Japan",
  "China",
  "South Korea",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Canada",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const YEARS = Array.from({ length: 10 }, (_, i) =>
  String(new Date().getFullYear() + i),
);

function formatCard(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1-")
    .trim();
}

// Convert month name to number string e.g. "January" -> "01"
function monthToNumber(month: string): string {
  const idx = MONTHS.indexOf(month);
  return idx >= 0 ? String(idx + 1).padStart(2, "0") : "01";
}

export default function PaymentStep({ data, onChange, onBack, onNext }: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  function set(key: keyof PaymentData, value: string) {
    onChange({ ...data, [key]: value });
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!data.country) next.country = "Please select a country";
    if (!data.firstName.trim()) next.firstName = "Please enter your first name";
    if (!data.lastName.trim()) next.lastName = "Please enter your last name";
    if (data.cardNumber.replace(/-/g, "").length < 16)
      next.cardNumber = "Please enter a valid card number";
    if (!data.month) next.month = "Required";
    if (!data.year) next.year = "Required";
    if (data.cvc.length < 3) next.cvc = "Invalid CVC";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleNext() {
    if (!validate()) return;

    setSaving(true);
    setServerError("");

    try {
      const token = localStorage.getItem("token");

      // Build expiry date from month + year
      const monthNum = monthToNumber(data.month);
      const expiryDate = new Date(`${data.year}-${monthNum}-01`).toISOString();

      const res = await fetch("/api/payment/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          country: data.country,
          firstName: data.firstName,
          lastName: data.lastName,
          cardNumber: data.cardNumber.replace(/-/g, ""),
          expiryDate,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to save card");
      }

      onNext();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to save card",
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass = (field: keyof PaymentData) =>
    `w-full border px-4 py-2.5 text-sm outline-none transition-colors rounded-md focus:border-gray-400 bg-white ${
      errors[field] ? "border-red-400" : "border-gray-300"
    }`;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        How would you like to be paid?
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Enter location and payment details
      </p>

      {/* Country */}
      <div className="mb-5">
        <label className="block text-sm text-gray-700 mb-1.5">
          Select country
        </label>
        <select
          value={data.country}
          onChange={(e) => set("country", e.target.value)}
          className={inputClass("country")}
        >
          <option value="">Select</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-xs text-red-500">{errors.country}</p>
        )}
      </div>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">
            First name
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            placeholder="Enter your name here"
            className={inputClass("firstName")}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">
            Last name
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="Enter your name here"
            className={inputClass("lastName")}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Card number */}
      <div className="mb-5">
        <label className="block text-sm text-gray-700 mb-1.5">
          Enter card number
        </label>
        <input
          type="text"
          value={data.cardNumber}
          onChange={(e) => set("cardNumber", formatCard(e.target.value))}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          className={inputClass("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
        )}
      </div>

      {/* Expires + CVC */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">Expires</label>
          <select
            value={data.month}
            onChange={(e) => set("month", e.target.value)}
            className={inputClass("month")}
          >
            <option value="">Month</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {errors.month && (
            <p className="mt-1 text-xs text-red-500">{errors.month}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">Year</label>
          <select
            value={data.year}
            onChange={(e) => set("year", e.target.value)}
            className={inputClass("year")}
          >
            <option value="">Year</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {errors.year && (
            <p className="mt-1 text-xs text-red-500">{errors.year}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">CVC</label>
          <input
            type="text"
            value={data.cvc}
            onChange={(e) =>
              set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            placeholder="CVC"
            className={inputClass("cvc")}
          />
          {errors.cvc && (
            <p className="mt-1 text-xs text-red-500">{errors.cvc}</p>
          )}
        </div>
      </div>

      {serverError && (
        <p className="mb-4 text-sm text-red-500">{serverError}</p>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={saving}
          className="bg-gray-400 text-white text-sm font-medium px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Continue"}
        </button>
      </div>
    </div>
  );
}
