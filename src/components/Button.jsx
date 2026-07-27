const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
  secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:ring-slate-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-primary-500',
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
