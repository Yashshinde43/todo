import express from "express";
import {
  CreateTask,
  deleteTask,
  getallTasks,
} from "../controllers/taskController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/getalltask", authenticateUser, getallTasks);
router.post("/newtask", authenticateUser, CreateTask);
router.delete("/deletetask/:id", authenticateUser, deleteTask);

export default router;
