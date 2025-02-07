import { Task } from "../models/task.js";
import { User } from "../models/user.js";

export const getallTasks = async (req, res) => {
  try {
    const userId = await User.findOne({email: req.user.email});
    // console.log(req.user.id );
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // const userData = await User.find({ email: req.user.email });
    const tasks = await Task.find({ user: user._id }).sort({ _id: -1 });
    res.status(200).json({
      tasks,
      message: "All tasks fetched successfully",
      success: true,
      userData: [user],
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const CreateTask = async (req, res) => {
  try {
    const email = req.user.email;
    // console.log(email);

    const user = await User.findOne({email});
    // console.log(user);

    const { title, description, isCompleted } = req.body;
    const task = await Task.create({
      title,
      description,
      isCompleted: isCompleted || false, // Default false if not provided
      user: user._id, 
    });
    res.status(201).json({
      message: "Task created successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in creating task");
    console.log(error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};
