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

const COUNTRIES = ["Монгол", "Япон", "АНУ", "Хятад", "Солонгос", "Их Британи"];
const MONTHS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const YEARS = Array.from({ length: 10 }, (_, i) =>
  String(new Date().getFullYear() + i),
);

function formatCard(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export default function PaymentStep({ data, onChange, onBack, onNext }: Props) {
  const [errors, setErrors] = useState<Errors>({});

  function set(key: keyof PaymentData, value: string) {
    onChange({ ...data, [key]: value });
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!data.country) next.country = "Улс сонгоно уу";
    if (!data.firstName.trim()) next.firstName = "Овог оруулна уу";
    if (!data.lastName.trim()) next.lastName = "Нэр оруулна уу";
    if (data.cardNumber.replace(/\s/g, "").length < 16)
      next.cardNumber = "Картын дугаар буруу";
    if (!data.month) next.month = "Сар";
    if (!data.year) next.year = "Он";
    if (data.cvc.length < 3) next.cvc = "CVC буруу";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    if (validate()) onNext();
  }

  const inputClass = (field: keyof PaymentData) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-gray-400 ${
      errors[field] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8">
      <h1 className="text-xl font-medium text-gray-900 mb-1">
        Хэрхэн төлбөр авах вэ?
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        Байршил болон төлбөрийн мэдээллийг оруулна уу
      </p>

      {/* Country */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1.5">Улс сонгох</label>
        <select
          value={data.country}
          onChange={(e) => set("country", e.target.value)}
          className={inputClass("country")}
        >
          <option value="">Сонгох</option>
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
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Овог</label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            placeholder="Овог"
            className={inputClass("firstName")}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Нэр</label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="Нэр"
            className={inputClass("lastName")}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Card number */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1.5">
          Картын дугаар
        </label>
        <input
          type="text"
          value={data.cardNumber}
          onChange={(e) => set("cardNumber", formatCard(e.target.value))}
          placeholder="XXXX XXXX XXXX XXXX"
          className={inputClass("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
        )}
      </div>

      {/* Expires + CVC */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Сар</label>
          <select
            value={data.month}
            onChange={(e) => set("month", e.target.value)}
            className={inputClass("month")}
          >
            <option value="">Сар</option>
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
          <label className="block text-sm text-gray-500 mb-1.5">Он</label>
          <select
            value={data.year}
            onChange={(e) => set("year", e.target.value)}
            className={inputClass("year")}
          >
            <option value="">Он</option>
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
          <label className="block text-sm text-gray-500 mb-1.5">CVC</label>
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

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
        >
          ← Буцах
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
        >
          Үргэлжлүүлэх →
        </button>
      </div>
    </div>
  );
}
