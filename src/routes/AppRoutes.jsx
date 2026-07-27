import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Login from '../pages/Login.jsx';
import NotFound from '../pages/NotFound.jsx';
import Planner from '../pages/Planner.jsx';
import Profile from '../pages/Profile.jsx';
import Register from '../pages/Register.jsx';
import Subjects from '../pages/Subjects.jsx';
import Tasks from '../pages/Tasks.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/home" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
