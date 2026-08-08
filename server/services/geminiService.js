import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateStudyPlanWithGemini = async (plannerData, userSubjects = []) => {
  const { goal, studyHours, productiveTime, examTimeline } = plannerData;
  const subjectsList = userSubjects.length > 0 ? userSubjects.map(s => s.name).join(", ") : "None specific provided";

  const prompt = `
You are an expert AI Study Planner.

Create a personalized study plan based on the following details:

Goal: ${goal}
Study Hours Per Day: ${studyHours}
Most Productive Time: ${productiveTime}
Next Exam: ${examTimeline}
User's Registered Subjects: ${subjectsList}

You MUST return the response strictly as a JSON object with two fields:
1. "markdownPlan": A beautiful markdown string containing the detailed study plan (Daily Schedule, Weekly Goals, Revision Strategy, Time Management, Motivation). Do NOT include the tasks list here, just the high-level plan.
2. "tasks": An array of actionable task objects derived from the study plan. 

For each task in the "tasks" array, provide:
- "title": (String) A clear, actionable title for the task (e.g. "Study Mathematics for 2 hours").
- "description": (String) A brief description or sub-tasks.
- "priority": (String) Must be exactly "Low", "Medium", or "High".
- "subjectName": (String) Try to match exactly one of the user's registered subjects: [${subjectsList}]. If none fit, you can leave it empty string "".
- "suggestedDaysFromNow": (Number) How many days from today this task should be due (e.g., 0 for today, 1 for tomorrow).

Return ONLY raw JSON. Do not include \`\`\`json markdown blocks, just the JSON string starting with { and ending with }.
`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not set. Using mock study plan for testing.");
      return getMockStudyPlan(goal, studyHours, userSubjects);
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;
    // Clean up potential markdown JSON wrapper
    text = text.replace(/^```json/, '').replace(/```$/, '').trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error.message || error);
    console.warn("Falling back to mock study plan to preserve functionality during testing.");
    return getMockStudyPlan(goal, studyHours, userSubjects);
  }
};

const getMockStudyPlan = (goal, studyHours, userSubjects) => {
  const mockSubject = userSubjects.length > 0 ? userSubjects[0].name : "";

  return {
    markdownPlan: `
# Your Personalized Study Plan for ${goal}

Based on your inputs, here is a structured study plan designed to help you succeed!

## 📅 Daily Study Schedule (Goal: ${studyHours} per day)
* **Session 1 (Morning):** Core Concepts & Theory (40% of time)
* **Session 2 (Afternoon):** Problem Solving & Practice (40% of time)
* **Session 3 (Evening):** Revision & Flashcards (20% of time)

## 🎯 Weekly Goals
1. **Monday - Friday:** Complete 2 new chapters and practice 50 related questions.
2. **Saturday:** Take a full-length mock test to assess progress.
3. **Sunday:** Review mistakes, rest, and plan the upcoming week.

## 🔄 Revision Strategy
* **Active Recall:** Instead of just re-reading, test yourself on key concepts.
* **Spaced Repetition:** Revisit difficult topics 1 day, 3 days, and 1 week after first learning them.

## 💡 Time Management Tips
* Use the **Pomodoro Technique** (25 mins study, 5 mins break).
* Keep your study environment free from digital distractions.
* Hydrate well and prioritize sleep.

*Note: This is a fallback mock plan generated because the AI service is currently unavailable or in testing mode.*
`,
    tasks: [
      {
        title: `Review core concepts for ${goal}`,
        description: "Focus on the most heavily weighted topics for your upcoming exam.",
        priority: "High",
        subjectName: mockSubject,
        suggestedDaysFromNow: 0
      },
      {
        title: "Practice 50 Questions",
        description: "Apply active recall on the topics learned yesterday.",
        priority: "Medium",
        subjectName: mockSubject,
        suggestedDaysFromNow: 1
      },
      {
        title: "Weekly Mock Test",
        description: "Take a full length mock test under timed conditions.",
        priority: "High",
        subjectName: mockSubject,
        suggestedDaysFromNow: 5
      }
    ]
  };
};