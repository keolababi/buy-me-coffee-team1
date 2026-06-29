import { QRCodeFrame } from "./QrCodeFrame";

interface QPayPanelProps {
  qrCodeUrl: string;
  generating: boolean;
  amount?: number;
}

export function QPayPanel({ qrCodeUrl, generating, amount }: QPayPanelProps) {
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <h2 className="mb-1.5 text-xl font-semibold text-black">Scan QR code</h2>
      <p className="mb-6 text-sm text-gray-500">
        {amount
          ? `Scan the QR code to send $${amount}`
          : "Scan the QR code to complete your donation"}
      </p>

      {generating ? (
        <div className="flex h-56 w-56 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
        </div>
      ) : qrCodeUrl ? (
        <QRCodeFrame src={qrCodeUrl} alt="QPay QR code" />
      ) : (
        <div className="flex h-56 w-56 items-center justify-center text-sm text-gray-400">
          Failed to generate QR
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">
        Waiting for payment confirmation…
      </p>
    </div>
  );
}
