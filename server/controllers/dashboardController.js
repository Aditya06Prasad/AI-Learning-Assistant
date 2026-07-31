import Task from "../models/Task.js";
import Subject from "../models/Subject.js";
import mongoose from "mongoose";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const [taskStats, totalSubjects, upcomingDeadlines, recentSubjects, recentTasks] = await Promise.all([
      Task.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId.toString()) } },
        {
          $group: {
            _id: null,
            totalTasks: { $sum: 1 },
            completedTasks: { $sum: { $cond: ["$completed", 1, 0] } },
            pendingTasks: { $sum: { $cond: ["$completed", 0, 1] } },
          },
        },
      ]),
      Subject.countDocuments({ user: userId }),
      Task.find({ user: userId, completed: false, dueDate: { $gte: new Date() } })
        .sort({ dueDate: 1 })
        .limit(5)
        .populate("subject", "name"),
      Subject.find({ user: userId }).sort({ createdAt: -1 }).limit(5),
      Task.find({ user: userId }).sort({ createdAt: -1 }).limit(5).populate("subject", "name")
    ]);

    const stats = taskStats.length > 0 ? taskStats[0] : { totalTasks: 0, completedTasks: 0, pendingTasks: 0 };
    
    const completionPercentage = stats.totalTasks === 0 ? 0 : Math.round((stats.completedTasks / stats.totalTasks) * 100);

    res.json({
      totalSubjects,
      totalTasks: stats.totalTasks,
      completedTasks: stats.completedTasks,
      pendingTasks: stats.pendingTasks,
      completionPercentage,
      upcomingDeadlines,
      recentSubjects,
      recentTasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
