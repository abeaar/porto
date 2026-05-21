interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "font-medium rounded transition-all duration-150 focus:outline-none cursor-pointer flex justify-center items-center";

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-500 shadow-md shadow-green-950/20 active:scale-98",
    secondary: "bg-zinc-800 text-zinc-150 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 active:scale-98",
    danger: "bg-red-600 text-white hover:bg-red-500 active:scale-98",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
