"use client";

import { useState } from "react";

const COUNTRIES = [
  "United States",
  "Mongolia",
  "Japan",
  "China",
  "South Korea",
  "United Kingdom",
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

function formatCard(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export default function PaymentDetails() {
  const [country, setCountry] = useState("United States");
  const [firstName, setFirstName] = useState("Jake");
  const [lastName, setLastName] = useState("Mulligan");
  const [card, setCard] = useState("");
  const [month, setMonth] = useState("August");
  const [year, setYear] = useState("2028");
  const [cvc, setCvc] = useState("590");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const input =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors";

  return (
    <section className="border border-gray-200 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">
        Payment details
      </h2>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Select country
        </label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={input}
        >
          {COUNTRIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">First name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={input}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Last name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={input}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Enter card number
        </label>
        <input
          value={card}
          onChange={(e) => setCard(formatCard(e.target.value))}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          className={input}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Expires</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={input}
          >
            {MONTHS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={input}
          >
            {YEARS.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">CVC</label>
          <input
            value={cvc}
            onChange={(e) =>
              setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            placeholder="CVC"
            className={input}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
      >
        {saved ? "Saved ✓" : "Save changes"}
      </button>
    </section>
  );
}
