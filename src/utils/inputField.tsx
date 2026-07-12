export default function Field({
  label,
  name,
  type,
  value,
  onChange,
  autoComplete,
  required,
  error,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[13px] font-semibold text-gray-600"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-[#4A6CF7]/15 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-slate-200 focus:border-[#4A6CF7]"
        }`}
      />
      {error && (
        <p className="mt-1 text-[12px] font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
