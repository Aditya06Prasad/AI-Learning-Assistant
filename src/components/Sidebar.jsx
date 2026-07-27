import { NavLink } from 'react-router-dom';
import { FiBookOpen, FiCalendar, FiCheckSquare, FiGrid, FiUser } from 'react-icons/fi';
import { NAV_LINKS } from '../utils/constants.js';

const icons = {
  Dashboard: FiGrid,
  Subjects: FiBookOpen,
  Tasks: FiCheckSquare,
  Planner: FiCalendar,
  Profile: FiUser,
};

export default function Sidebar() {
  return (
    <aside className="border-b border-slate-200 bg-white lg:min-h-[calc(100vh-4rem)] lg:w-64 lg:border-b-0 lg:border-r">
      <nav className="flex gap-2 overflow-x-auto p-4 lg:flex-col lg:gap-1">
        {NAV_LINKS.map((link) => {
          const Icon = icons[link.label];

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex min-w-max items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
