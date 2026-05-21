interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{label}</label>
      )}
      <input
        className={`px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-green-500/80 focus:border-green-500/80 transition-all ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}
