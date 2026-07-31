import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(authMiddleware, getTasks).post(authMiddleware, createTask);
router.route("/:id").get(authMiddleware, getTaskById).put(authMiddleware, updateTask).delete(authMiddleware, deleteTask);

export default router;
