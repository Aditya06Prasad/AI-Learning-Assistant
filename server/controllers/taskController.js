import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const filter = { user: req.user._id };

    if (req.query.subject) {
      filter.subject = req.query.subject;
    }

    const tasks = await Task.find(filter).populate("subject", "name").sort({ dueDate: 1 });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("subject", "name");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    return res.json({ message: "Task removed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
