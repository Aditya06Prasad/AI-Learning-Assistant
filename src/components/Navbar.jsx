import { FiLogOut, FiMoon } from 'react-icons/fi';
import Button from './Button.jsx';
import { APP_NAME } from '../utils/constants.js';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
            SF
          </div>
          <span className="text-lg font-semibold text-slate-900">{APP_NAME}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Dark mode placeholder"
          >
            <FiMoon className="h-5 w-5" />
          </button>
          <div className="h-9 w-9 rounded-full bg-slate-200" aria-label="User avatar placeholder" />
          <Button variant="outline" className="hidden gap-2 sm:inline-flex">
            <FiLogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
