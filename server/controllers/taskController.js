const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const filter = { user: req.user._id };

  if (req.query.subject) {
    filter.subject = req.query.subject;
  }

  const tasks = await Task.find(filter).populate("subject", "name").sort({ dueDate: 1 });
  return res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, subject, dueDate, priority } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    subject,
    dueDate,
    priority,
  });

  return res.status(201).json(task);
};

const getTaskById = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("subject", "name");

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.subject = req.body.subject ?? task.subject;
  task.dueDate = req.body.dueDate ?? task.dueDate;
  task.priority = req.body.priority ?? task.priority;
  task.completed = req.body.completed ?? task.completed;

  const updatedTask = await task.save();
  return res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.deleteOne();
  return res.json({ message: "Task removed" });
};

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
