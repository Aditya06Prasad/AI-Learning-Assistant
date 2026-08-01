import { useState, useEffect } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

const PREPARING_FOR_OPTIONS = [
  "JEE Main", "JEE Advanced", "NEET", "UPSC", "GATE", "CAT", "CLAT", "SSC CGL",
  "NDA", "CUET", "IELTS", "TOEFL", "Placement Preparation", "Government Job", "Higher Studies", "Other"
];

const EDUCATION_LEVELS = ["Class 1-10", "Class 11-12", "Undergraduate"];
const BOARDS = ["CBSE", "ICSE", "State Board", "IB", "IGCSE", "NIOS"];
const STREAMS = ["Science", "Commerce", "Arts (Humanities)"];
const SCIENCE_GROUPS = ["PCM", "PCB"];

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    schoolName: user?.schoolName || "",
    educationLevel: user?.educationLevel || "",
    board: user?.board || "",
    stream: user?.stream || "",
    scienceGroup: user?.scienceGroup || "",
    course: user?.course || "",
    classLevel: user?.classLevel || "",
    preparingFor: "",
    customPreparingFor: "",
  });
  
  const [preview, setPreview] = useState(
    user?.profilePicture
      ? `http://localhost:5050${user.profilePicture}`
      : "https://i.pravatar.cc/150"
  );
  
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      let prepFor = user.preparingFor || "";
      let customPrep = "";
      if (prepFor && !PREPARING_FOR_OPTIONS.includes(prepFor)) {
        customPrep = prepFor;
        prepFor = "Other";
      }

      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        schoolName: user.schoolName || "",
        educationLevel: user.educationLevel || "",
        board: user.board || "",
        stream: user.stream || "",
        scienceGroup: user.scienceGroup || "",
        course: user.course || "",
        classLevel: user.classLevel || "",
        preparingFor: prepFor,
        customPreparingFor: customPrep,
      }));
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
      
      const dataToSend = new FormData();
      dataToSend.append("fullName", formData.fullName);
      dataToSend.append("schoolName", formData.schoolName);
      dataToSend.append("educationLevel", formData.educationLevel);
      dataToSend.append("board", formData.board);
      dataToSend.append("stream", formData.stream);
      dataToSend.append("scienceGroup", formData.scienceGroup);
      dataToSend.append("course", formData.course);
      dataToSend.append("classLevel", formData.classLevel);
      
      const finalPreparingFor = formData.preparingFor === "Other" ? formData.customPreparingFor : formData.preparingFor;
      dataToSend.append("preparingFor", finalPreparingFor);

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

  const renderAcademicField = (icon, label, value) => (
    <div className="flex flex-col bg-slate-50 p-4 rounded-xl border border-slate-100">
      <span className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-2">
        <span>{icon}</span> {label}
      </span>
      <span className="text-lg font-bold text-slate-800">
        {value || "Not Added"}
      </span>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold flex items-center gap-3 text-slate-800">
        👤 Profile
      </h1>

      {message.text && (
        <div className={`p-4 rounded-2xl ${message.type === 'success' ? 'bg-pastel-green/20 text-green-800 border border-pastel-green' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <Card className="overflow-hidden p-0 border-2 border-transparent hover:border-pastel-purple/20 transition-all duration-300">
        {!isEditing ? (
          <div className="flex flex-col md:flex-row">
            {/* Left Column: Basic Info */}
            <div className="md:w-1/3 bg-slate-50 p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-slate-100">
              <div className="relative group">
                <img
                  src={preview}
                  alt="Profile"
                  className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-xl mb-6"
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 text-center">
                {user?.fullName || "User Name"}
              </h2>
              <p className="text-slate-500 mb-8 text-center">
                {user?.email || "user@example.com"}
              </p>
              <Button className="w-full shadow-lg shadow-pastel-purple/30" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </div>

            {/* Right Column: Academic Info */}
            <div className="md:w-2/3 p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                🎓 Academic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderAcademicField("🏫", "School / College Name", user?.schoolName)}
                {renderAcademicField("🎓", "Education Level", user?.educationLevel)}
                {renderAcademicField("📚", "Board / Stream / Course", 
                  user?.educationLevel === "Class 1-10" ? user?.board : 
                  user?.educationLevel === "Class 11-12" ? (user?.scienceGroup || user?.stream) : 
                  user?.course
                )}
                {renderAcademicField("📖", "Class / Year", 
                  user?.educationLevel === "Class 1-10" ? user?.course : 
                  user?.classLevel || "Not Added"
                )}
                {renderAcademicField("🎯", "Preparing For", user?.preparingFor)}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800">Edit Profile</h2>
              <Button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-600" onClick={() => { setIsEditing(false); setPreview(user?.profilePicture ? `http://localhost:5050${user.profilePicture}` : "https://i.pravatar.cc/150"); }}>
                Cancel
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Update Info Form */}
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                
                <div className="flex flex-col items-center mb-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <img
                    src={preview}
                    alt="Preview"
                    className="rounded-full w-28 h-28 object-cover border-4 border-white shadow-md mb-4"
                  />
                  <input
                    id="profilePicture"
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleImageChange}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-pastel-purple/10 file:text-pastel-purple hover:file:bg-pastel-purple/20 transition-colors"
                  />
                </div>

                <div className="space-y-4">
                  <InputField
                    id="fullName"
                    label="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  
                  <InputField
                    id="schoolName"
                    label="School / College Name"
                    placeholder="e.g. ABC Public School"
                    maxLength={100}
                    value={formData.schoolName}
                    onChange={handleChange}
                  />

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Education Level</label>
                    <select
                      id="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-pastel-purple bg-white text-slate-700 transition-colors"
                    >
                      <option value="">Select Level</option>
                      {EDUCATION_LEVELS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  {formData.educationLevel === "Class 1-10" && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Board</label>
                        <select
                          id="board"
                          value={formData.board}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-pastel-purple bg-white text-slate-700 transition-colors"
                        >
                          <option value="">Select Board</option>
                          {BOARDS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <InputField
                        id="course"
                        label="Class"
                        placeholder="e.g. Class 8"
                        value={formData.course}
                        onChange={handleChange}
                      />
                    </>
                  )}

                  {formData.educationLevel === "Class 11-12" && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Stream</label>
                        <select
                          id="stream"
                          value={formData.stream}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-pastel-purple bg-white text-slate-700 transition-colors"
                        >
                          <option value="">Select Stream</option>
                          {STREAMS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      {formData.stream === "Science" && (
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Science Group</label>
                          <select
                            id="scienceGroup"
                            value={formData.scienceGroup}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-pastel-purple bg-white text-slate-700 transition-colors"
                          >
                            <option value="">Select Group</option>
                            {SCIENCE_GROUPS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                      )}
                      <InputField
                        id="classLevel"
                        label="Class"
                        placeholder="e.g. Class 12"
                        value={formData.classLevel}
                        onChange={handleChange}
                      />
                    </>
                  )}

                  {formData.educationLevel === "Undergraduate" && (
                    <>
                      <InputField
                        id="course"
                        label="Course"
                        placeholder="e.g. B.Tech (CSE)"
                        value={formData.course}
                        onChange={handleChange}
                      />
                      <InputField
                        id="classLevel"
                        label="Year"
                        placeholder="e.g. 2nd Year"
                        value={formData.classLevel}
                        onChange={handleChange}
                      />
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preparing For</label>
                    <select
                      id="preparingFor"
                      value={formData.preparingFor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-pastel-purple bg-white text-slate-700 transition-colors"
                    >
                      <option value="">Select Goal</option>
                      {PREPARING_FOR_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  
                  {formData.preparingFor === "Other" && (
                    <InputField
                      id="customPreparingFor"
                      label="Specify Goal"
                      placeholder="Enter your goal"
                      value={formData.customPreparingFor}
                      onChange={handleChange}
                    />
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full shadow-lg shadow-pastel-purple/30">
                  {isSubmitting ? "Saving..." : "Save Profile Changes"}
                </Button>
              </form>

              {/* Change Password Form */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 self-start">
                <form onSubmit={handleUpdatePassword} className="space-y-5">
                  <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                    🔒 Security
                  </h3>
                  
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

                  <Button type="submit" disabled={isSubmitting || !formData.password} className="w-full bg-slate-800 hover:bg-slate-900 border-slate-800">
                    Update Password
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;