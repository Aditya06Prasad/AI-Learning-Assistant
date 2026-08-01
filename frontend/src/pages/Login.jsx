import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      setIsSubmitting(true);
      const { data } = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      login(data.user, data.token);
      if (data.user.onboardingCompleted) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          Plan Smarter.
          <br />
          Learn Faster.
          <br />
          Stay Consistent.
        </p>
      </div>

      <div className="flex items-center justify-center w-1/2 bg-gray-100">
        <div className="bg-white w-[420px] rounded-xl shadow-lg p-10">
          <h2 className="mb-2 text-3xl font-bold">Welcome Back</h2>

          <p className="mb-8 text-gray-500">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <PasswordField
              id="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="mt-6 text-center">
            Don&apos;t have an account?

            <Link
              to="/register"
              className="ml-2 font-semibold text-blue-600"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
