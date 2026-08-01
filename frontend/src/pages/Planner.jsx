import { useState } from "react";

import PlannerWelcome from "../aiPlanner/PlannerWelcome";
import PlannerQuestions from "../aiPlanner/PlannerQuestions";
import PlannerLoading from "../aiPlanner/PlannerLoading";
import PlannerResult from "../aiPlanner/PlannerResult";

const Planner = () => {
  const [currentStep, setCurrentStep] = useState("welcome");

  const screens = {
    welcome: (
      <PlannerWelcome
        onStart={() => setCurrentStep("questions")}
      />
    ),

    questions: (
      <PlannerQuestions
        onComplete={() => setCurrentStep("loading")}
      />
    ),

    loading: (
      <PlannerLoading
        onFinish={() => setCurrentStep("result")}
      />
    ),

    result: <PlannerResult />,
  };

  return screens[currentStep];
};

export default Planner;