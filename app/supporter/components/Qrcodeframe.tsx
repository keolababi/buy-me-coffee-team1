interface QRCodeFrameProps {
  src: string;
  alt?: string;
}

export function QRCodeFrame({ src, alt = "QR code" }: QRCodeFrameProps) {
  return (
    <div className='relative flex items-center justify-center rounded-xl border border-gray-200 p-4'>
      <span className='absolute left-1 top-1 h-5 w-5 rounded-tl border-l-2 border-t-2 border-gray-300' />
      <span className='absolute right-1 top-1 h-5 w-5 rounded-tr border-r-2 border-t-2 border-gray-300' />
      <span className='absolute bottom-1 left-1 h-5 w-5 rounded-bl border-b-2 border-l-2 border-gray-300' />
      <span className='absolute bottom-1 right-1 h-5 w-5 rounded-br border-b-2 border-r-2 border-gray-300' />
      <img
        src={src}
        alt={alt}
        className='h-56 w-56 object-contain'
      />
    </div>
  );
}
