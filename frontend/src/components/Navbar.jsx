import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-8 py-5 bg-white border-b-4 border-pastel-green/50">

      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
           AI Learning Assistant 💡
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <span className="font-medium">
          {user?.fullName || user?.email || "User"}
        </span>

        <Button onClick={handleLogout}>
          Logout
        </Button>

      </div>

    </header>
  );
};

export default Navbar;