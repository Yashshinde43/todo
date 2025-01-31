import { Task } from "../models/task.js";
import { User } from "../models/user.js";

export const getallTasks = async (req, res) => {
  try {
    const userData = await User.find({ email: req.user.email });
    const tasks = await Task.find().sort({ _id: -1 });
    res.status(200).json({
      tasks,
      message: "All tasks fetched successfully",
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const CreateTask = async (req, res) => {
  try {
    const userId = await User.findOne({id: req.user.id});
    const { title, description, isCompleted } = req.body;

    const task = await Task.create({
      title,
      description,
      user:userId
      // isCompleted,
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
