import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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

            <Button fullWidth>
              Register
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