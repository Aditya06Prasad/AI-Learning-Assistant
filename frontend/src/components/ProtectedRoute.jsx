import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, requireOnboarding = true }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  if (requireOnboarding && user && !user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace state={{ from: location }} />;
  }

  if (!requireOnboarding && user?.onboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
