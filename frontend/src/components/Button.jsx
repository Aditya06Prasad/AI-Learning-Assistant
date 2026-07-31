const Button = ({
  children,
  type = "button",
  onClick,
  fullWidth = false,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-pastel-purple hover:bg-[#c7b6ef] text-slate-900 font-semibold px-6 py-3 rounded-full shadow-sm transition transform hover:-translate-y-0.5 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;