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

    const { 
      fullName, schoolName, preparingFor, educationLevel, 
      board, stream, course, classLevel, scienceGroup 
    } = req.body;

    user.fullName = fullName || user.fullName;
    
    // Academic fields
    if (schoolName !== undefined) user.schoolName = schoolName;
    if (preparingFor !== undefined) user.preparingFor = preparingFor;
    if (educationLevel !== undefined) user.educationLevel = educationLevel;
    if (board !== undefined) user.board = board;
    if (stream !== undefined) user.stream = stream;
    if (course !== undefined) user.course = course;
    if (classLevel !== undefined) user.classLevel = classLevel;
    if (scienceGroup !== undefined) user.scienceGroup = scienceGroup;

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
      schoolName: updatedUser.schoolName,
      preparingFor: updatedUser.preparingFor,
      educationLevel: updatedUser.educationLevel,
      board: updatedUser.board,
      stream: updatedUser.stream,
      course: updatedUser.course,
      classLevel: updatedUser.classLevel,
      scienceGroup: updatedUser.scienceGroup,
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
    const { 
      educationLevel, 
      course,
      stream,
      scienceGroup,
      board,
      subjects 
    } = req.body;
    
    if (!educationLevel) {
      return res.status(400).json({ message: "Education level is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.educationLevel = educationLevel;
    user.course = course || "";
    user.stream = stream || "";
    user.scienceGroup = scienceGroup || "";
    user.board = board || "";
    user.subjects = subjects || [];
    user.onboardingCompleted = true;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      onboardingCompleted: updatedUser.onboardingCompleted,
      educationLevel: updatedUser.educationLevel,
      course: updatedUser.course,
      stream: updatedUser.stream,
      scienceGroup: updatedUser.scienceGroup,
      board: updatedUser.board,
      subjects: updatedUser.subjects,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
