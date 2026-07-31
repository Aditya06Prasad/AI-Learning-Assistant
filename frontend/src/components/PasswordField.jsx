import { FiEye } from 'react-icons/fi';

export default function PasswordField({ label, id, error, className = '', ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type="password"
          className={`w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pastel-purple focus:ring-4 focus:ring-pastel-purple/20 ${className}`}
          {...props}
        />
        <FiEye className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
