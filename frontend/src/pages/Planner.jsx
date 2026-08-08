import { useState } from "react";

import PlannerWelcome from "../aiPlanner/PlannerWelcome";
import PlannerQuestions from "../aiPlanner/PlannerQuestions";
import PlannerLoading from "../aiPlanner/PlannerLoading";
import PlannerResult from "../aiPlanner/PlannerResult";
import api from "../services/api";

const Planner = () => {
  const [currentStep, setCurrentStep] = useState("welcome");
  const [plannerAnswers, setPlannerAnswers] = useState({});
  const [studyPlan, setStudyPlan] = useState(null);

  const generateStudyPlan = async () => {
    try {
      const response = await api.post("/api/planner/generate", {
        goal: plannerAnswers[1],
        studyHours: plannerAnswers[2],
        productiveTime: plannerAnswers[3],
        examTimeline: plannerAnswers[4],
      });

      setStudyPlan(response.data.studyPlan);
      setCurrentStep("result");
    } catch (error) {
      console.error(error);
      alert("Failed to generate study plan.");
    }
  };

  const screens = {
    welcome: (
      <PlannerWelcome
        onStart={() => setCurrentStep("questions")}
      />
    ),

    questions: (
      <PlannerQuestions
        saveAnswers={setPlannerAnswers}
        onComplete={() => {
          setCurrentStep("loading");
        }}
      />
    ),

    loading: (
      <PlannerLoading
        onFinish={generateStudyPlan}
      />
    ),

    result: (
      <PlannerResult
        studyPlan={studyPlan}
      />
    ),
  };

  return screens[currentStep];
};

export default Planner;