export const TextField = (props: {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  type?: string;
  required?: boolean;
}) => {
  const {
    label,
    placeholder,
    value,
    onChange,
    error,
    helperText,
    type = "text",
    required = false,
  } = props;

  return (
    <div className="space-y-2">
      {label && (
        <label className="font-semibold text-sm">
          {label} {required && <span className="text-[#E14942]">*</span>}
        </label>
      )}
      <input
        className={`w-full h-11 rounded-lg border p-3 outline-none transition-colors ${
          error ? "border-[#E14942]" : "border-[#CBD5E1]"
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
      {error && helperText && (
        <p className="text-sm text-[#E14942]">{helperText}</p>
      )}
    </div>
  );
};
