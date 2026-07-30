import express from "express";
import {
  createSubject,
  getSubjects,
} from "../controllers/subjectController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createSubject);

router.get("/", authMiddleware, getSubjects);

export default router;