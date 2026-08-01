import { useState, useEffect } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });
  
  const [preview, setPreview] = useState(
    user?.profilePicture
      ? `http://localhost:5050${user.profilePicture}`
      : "https://i.pravatar.cc/150"
  );
  
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, fullName: user.fullName }));
      setPreview(
        user.profilePicture
          ? `http://localhost:5050${user.profilePicture}`
          : "https://i.pravatar.cc/150"
      );
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    
    try {
      setIsSubmitting(true);
      
      // Handle Profile info update
      const dataToSend = new FormData();
      dataToSend.append("fullName", formData.fullName);
      if (formData.profilePicture) {
        dataToSend.append("profilePicture", formData.profilePicture);
      }
      
      const { data } = await api.put("/api/users/profile", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      updateUser({ ...user, ...data });
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to update profile" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }
    if (!formData.password) return;
    
    try {
      setIsSubmitting(true);
      await api.put("/api/users/change-password", { password: formData.password });
      setMessage({ type: "success", text: "Password changed successfully!" });
      setFormData({ ...formData, password: "", confirmPassword: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to change password" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        👤 Profile
      </h1>

      {message.text && (
        <div className={`p-4 rounded-2xl ${message.type === 'success' ? 'bg-pastel-green text-slate-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <Card>
        {!isEditing ? (
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover border-4 border-pastel-purple/30"
            />
            <h2 className="mt-4 text-2xl font-bold text-slate-800">
              {user?.fullName || "User Name"}
            </h2>
            <p className="text-gray-500">
              {user?.email || "user@example.com"}
            </p>
            <Button className="mt-6" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {/* Update Profile Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Update Info</h3>
              
              <div className="flex flex-col items-center mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-full w-24 h-24 object-cover border-4 border-pastel-purple/30 mb-3"
                />
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={handleImageChange}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pastel-purple file:text-slate-900 hover:file:bg-[#c7b6ef]"
                />
              </div>

              <InputField
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              
              <InputField
                id="email"
                label="Email"
                value={user?.email || ""}
                disabled
              />

              <div className="flex gap-4 pt-4">
                <Button type="button" className="bg-gray-200 hover:bg-gray-300" onClick={() => { setIsEditing(false); setPreview(user?.profilePicture ? `http://localhost:5050${user.profilePicture}` : "https://i.pravatar.cc/150"); }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Save Changes
                </Button>
              </div>
            </form>

            {/* Change Password Form */}
            <form onSubmit={handleUpdatePassword} className="space-y-5 border-t md:border-t-0 md:border-l border-slate-200 pt-8 md:pt-0 md:pl-10">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Change Password</h3>
              
              <PasswordField
                id="password"
                label="New Password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
              />
              
              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <div className="pt-4">
                <Button type="submit" disabled={isSubmitting || !formData.password}>
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;