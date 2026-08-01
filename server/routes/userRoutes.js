import express from "express";
import { getProfile, updateProfile, changePassword, updateOnboarding } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, upload.single("profilePicture"), updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.put("/onboarding", authMiddleware, updateOnboarding);

export default router;
