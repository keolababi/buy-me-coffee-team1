export const Textfield = (props) => {
  const {
    name,
    label,
    placeholder,
    value,
    onChange,
    error,
    type = "text",
    required = false,
  } = props;
  // const errorMessage = error ? error() : "";
  return (
    <div className="space-y-2">
      <label className="font-semibold text-sm">
        {label} {required && <span className="text-[#E14942]">*</span>}
      </label>
      <input
        name={name}
        className={`w-full h-11 rounded-lg border p-3 outline-none transition-colors ${
          error ? "border-[#E14942]" : "border-[#CBD5E1] focus:border-black"
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
      {error && <span className="text-sm text-[#E14942]">{error};</span>}
    </div>
  );
};
