import { QRCodeFrame } from "./Qrcodeframe";

interface QPayPanelProps {
  qrImageUrl?: string;
  targetUrl?: string;
  amount?: number;

  onConfirm?: () => void;
}

function toQrImageUrl(targetUrl: string) {
  const normalized =
    targetUrl.startsWith("https://") ? targetUrl
    : targetUrl.startsWith("http://") ? targetUrl.replace("http://", "https://")
    : `https://${targetUrl}`;

  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    normalized,
  )}`;
}

export function QPayPanel({
  qrImageUrl,
  targetUrl,
  amount,
  onConfirm,
}: QPayPanelProps) {
  const src = qrImageUrl ?? (targetUrl ? toQrImageUrl(targetUrl) : "");

  return (
    <div className='flex flex-col items-center py-2 text-center'>
      <h2 className='mb-1.5 text-xl font-semibold text-black'>Scan QR code</h2>
      <p className='mb-6 text-sm text-gray-500'>
        {amount ?
          `Scan the QR code to send $${amount}`
        : "Scan the QR code to complete your donation"}
      </p>
      <QRCodeFrame
        src={src}
        alt='QPay QR code'
      />

      {onConfirm && (
        <button
          onClick={onConfirm}
          className='mt-6 w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-700'
        >
          I&apos;ve completed the payment
        </button>
      )}
    </div>
  );
}
