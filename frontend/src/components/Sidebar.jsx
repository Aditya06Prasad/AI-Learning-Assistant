import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  Sparkles,
  User,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Subjects",
    path: "/subjects",
    icon: <BookOpen size={20} />,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: <CheckSquare size={20} />,
  },
  {
    name: "AI Planner",
    path: "/planner",
    icon: <Sparkles size={20} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <User size={20} />,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen p-6 text-slate-800 bg-white border-r-2 border-pastel-purple/20">

      <h1 className="mb-10 text-2xl font-bold flex items-center gap-2">
        <span className="text-pastel-purple">⭐</span> StudyFlow
      </h1>

      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-2xl font-medium transition ${
                isActive
                  ? "bg-pastel-purple text-white shadow-sm"
                  : "hover:bg-pastel-purple/10 text-slate-600 hover:text-pastel-purple"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;