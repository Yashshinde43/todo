import mongoose from "mongoose";

// User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task', // Reference to the Task model
  }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export { User };
