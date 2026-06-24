import { useState } from "react";

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

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const YEARS = Array.from({ length: 12 }, (_, i) =>
  String(new Date().getFullYear() + i),
);

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.match(/.{1,4}/g)?.join("/") ?? digits;
}

export function CardForm({ onContinue }: CardFormProps) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");

  const canContinue =
    name.trim().length > 1 &&
    cardNumber.replace(/\D/g, "").length >= 12 &&
    expiryMonth.length > 0 &&
    expiryYear.length > 0 &&
    cvc.length >= 3;

  return (
    <div>
      <label className='mb-1.5 block text-sm text-black'>Name</label>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='First Last'
        className='mb-4 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-black outline-none focus:border-gray-400'
      />

      <label className='mb-1.5 block text-sm text-black'>Card number</label>
      <input
        type='text'
        inputMode='numeric'
        value={cardNumber}
        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
        placeholder='XXXX/XXXX/XXXX/XXXX'
        maxLength={19}
        className='mb-4 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-black outline-none focus:border-gray-400'
      />

      <div className='mb-6 grid grid-cols-3 gap-3'>
        <div>
          <label className='mb-1.5 block text-sm text-black'>Expires</label>
          <select
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value)}
            className='w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-black outline-none focus:border-gray-400'
          >
            <option
              value=''
              disabled
            >
              Month
            </option>
            {MONTHS.map((m) => (
              <option
                key={m}
                value={m}
              >
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='mb-1.5 block text-sm text-black'>Year</label>
          <select
            value={expiryYear}
            onChange={(e) => setExpiryYear(e.target.value)}
            className='w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-black outline-none focus:border-gray-400'
          >
            <option
              value=''
              disabled
            >
              Year
            </option>
            {YEARS.map((y) => (
              <option
                key={y}
                value={y}
              >
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='mb-1.5 block text-sm text-black'>CVC</label>
          <input
            type='text'
            inputMode='numeric'
            value={cvc}
            onChange={(e) =>
              setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            placeholder='CVC'
            className='w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-black outline-none focus:border-gray-400'
          />
        </div>
      </div>

      <div className='flex justify-end'>
        <button
          onClick={() =>
            onContinue({ name, cardNumber, expiryMonth, expiryYear, cvc })
          }
          disabled={!canContinue}
          className={`rounded-lg px-6 py-2.5 text-sm font-medium ${
            canContinue ?
              "bg-gray-900 text-white hover:bg-gray-700"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
