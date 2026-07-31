import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ icon: Icon = FiInbox, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-pastel-purple/50 bg-white px-6 py-12 text-center shadow-sm">
      <div className="mb-4 rounded-full bg-pastel-yellow p-4 text-slate-800 shadow-sm">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
    </div>
  );
}
