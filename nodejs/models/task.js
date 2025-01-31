
import mongoose from "mongoose";

// Task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false, // Default to false when a new task is added
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true, // Ensure every task has an associated user
  },
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);