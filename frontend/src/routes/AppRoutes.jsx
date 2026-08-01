import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Subjects from "../pages/Subjects";
import Tasks from "../pages/Tasks";
import Planner from "../pages/Planner";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Onboarding from "../pages/Onboarding";
import OnboardingSubjects from "../pages/OnboardingSubjects";
import ProtectedRoute from "../components/ProtectedRoute";

import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Onboarding is protected but doesn't require onboarding to be completed */}
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute requireOnboarding={false}>
            <Onboarding />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/onboarding/subjects" 
        element={
          <ProtectedRoute requireOnboarding={false}>
            <OnboardingSubjects />
          </ProtectedRoute>
        } 
      />

      <Route
        element={
          <ProtectedRoute requireOnboarding={true}>
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

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;