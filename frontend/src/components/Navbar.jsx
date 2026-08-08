import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-8 py-5 bg-white border-b-4 border-pastel-green/50 print:hidden">

      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
           AI Learning Assistant 💡
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2">
          <img
            src={user?.profilePicture ? `${API_URL}${user.profilePicture}` : "https://i.pravatar.cc/150"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-pastel-purple/50"
          />
          <span className="font-medium text-slate-700 hidden sm:block">
            {user?.fullName || user?.email || "User"}
          </span>
        </div>

        <Button onClick={handleLogout}>
          Logout
        </Button>

      </div>

    </header>
  );
};

export default Navbar;