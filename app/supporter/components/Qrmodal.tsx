interface QrModalProps {
  amount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function QrModal({ amount, onCancel, onConfirm }: QrModalProps) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-xl p-6 max-w-sm w-full shadow-xl'>
        <h2 className='text-lg font-semibold mb-2'>Complete Donation</h2>
        <p className='text-sm text-gray-500 mb-6'>
          Scan the QR code below to finalize your ${amount} donation.
        </p>

        <div className='w-full aspect-square bg-gray-100 rounded-lg mb-6 flex items-center justify-center border-2 border-dashed border-gray-200'>
          <span className='text-gray-400 text-xs'>QR Code Placeholder</span>
        </div>

        <div className='flex gap-3'>
          <button
            onClick={onCancel}
            className='flex-1 py-2.5 rounded-lg text-sm border border-gray-200 hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='flex-1 py-2.5 rounded-lg text-sm bg-gray-900 text-white hover:bg-gray-700'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
