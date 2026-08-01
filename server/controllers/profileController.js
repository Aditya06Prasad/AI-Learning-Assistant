import User from "../models/User.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.fullName = req.body.fullName || user.fullName;

    if (req.file) {
      // delete old profile picture if exists
      if (user.profilePicture) {
        const oldPath = path.join(
          __dirname,
          "..",
          user.profilePicture.replace(req.protocol + "://" + req.get("host") + "/", "")
        );
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      user.profilePicture = `/uploads/profile/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      onboardingCompleted: updatedUser.onboardingCompleted,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOnboarding = async (req, res) => {
  try {
    const { educationLevel, classLevel } = req.body;
    
    if (!educationLevel || !classLevel) {
      return res.status(400).json({ message: "Education level and class level are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.educationLevel = educationLevel;
    user.classLevel = classLevel;
    user.onboardingCompleted = true;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      onboardingCompleted: updatedUser.onboardingCompleted,
      educationLevel: updatedUser.educationLevel,
      classLevel: updatedUser.classLevel,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
