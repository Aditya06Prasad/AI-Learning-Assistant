import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      const { data } = await api.post("/api/auth/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      login(data.user, data.token);
      if (data.user.onboardingCompleted) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-1/2 px-16 text-white bg-blue-700">
        <h1 className="mb-6 text-5xl font-bold">
          AI Learning Assistant
        </h1>

        <p className="text-lg leading-8 text-blue-100">
          Create your account and
          <br />
          start learning smarter.
        </p>
      </div>

      <div className="flex items-center justify-center w-1/2 bg-gray-100">
        <div className="bg-white w-[450px] rounded-xl shadow-lg p-10">
          <h2 className="mb-2 text-3xl font-bold">
            Create Account
          </h2>

          <p className="mb-8 text-gray-500">
            Join AI Learning Assistant
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <InputField
              id="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <InputField
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <PasswordField
              id="password"
              label="Password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

            <PasswordField
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <div className="space-y-2">
              <label htmlFor="profilePicture" className="block text-sm font-medium text-slate-700">
                Profile Picture (Optional)
              </label>
              <input
                id="profilePicture"
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pastel-purple file:text-slate-900 hover:file:bg-[#c7b6ef]"
              />
            </div>

            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>

          </form>

          <p className="mt-6 text-center">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-semibold text-blue-600"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
