import { generateStudyPlanWithGemini } from "../services/geminiService.js";
import Task from "../models/Task.js";
import Subject from "../models/Subject.js";

export const generateStudyPlan = async (req, res) => {
  try {
    const { goal, studyHours, productiveTime, examTimeline } = req.body;
    const userId = req.user._id;

    // Fetch user subjects to pass to Gemini
    const userSubjects = await Subject.find({ user: userId });

    const aiResponse = await generateStudyPlanWithGemini({
      goal,
      studyHours,
      productiveTime,
      examTimeline,
    }, userSubjects);

    const { markdownPlan, tasks } = aiResponse;

    if (tasks && tasks.length > 0) {
      // Map Gemini's subjectName to actual ObjectId from userSubjects
      const tasksToInsert = tasks.map(task => {
        let subjectId = null;
        if (task.subjectName) {
          const matchedSubject = userSubjects.find(
            s => s.name.toLowerCase() === task.subjectName.toLowerCase()
          );
          if (matchedSubject) {
            subjectId = matchedSubject._id;
          }
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + (task.suggestedDaysFromNow || 0));

        return {
          user: userId,
          title: task.title,
          description: task.description,
          priority: task.priority || "Medium",
          subject: subjectId,
          dueDate: dueDate,
        };
      });

      // Insert all AI-generated tasks into the existing Tasks collection
      await Task.insertMany(tasksToInsert);
    }

    return res.status(200).json({
      success: true,
      message: "Study plan generated successfully.",
      studyPlan: markdownPlan,
    });
  } catch (error) {
    console.error("Planner Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate study plan.",
      error: error.message,
    });
  }
};