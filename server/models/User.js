import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    educationLevel: {
      type: String,
      default: "",
    },
    course: {
      type: String,
      default: "",
    },
    stream: {
      type: String,
      default: "",
    },
    scienceGroup: {
      type: String,
      default: "",
    },
    board: {
      type: String,
      default: "",
    },
    classLevel: {
      type: String,
      default: "",
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
    subjects: {
      type: [String],
      default: [],
    },
    schoolName: {
      type: String,
      default: "",
    },
    preparingFor: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to say", ""],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);