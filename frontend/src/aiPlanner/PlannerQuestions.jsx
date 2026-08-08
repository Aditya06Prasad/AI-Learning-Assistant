import { useState } from "react";
import Button from "../components/Button";

const questions = [
  {
    id: 1,
    question: "What is your primary goal?",
    options: [
      "Prepare for Exams",
      "Complete My Syllabus",
      "Improve Weak Subjects",
      "Build Daily Consistency",
    ],
  },
  {
    id: 2,
    question: "How many hours can you study per day?",
    options: [
      "1-2 Hours",
      "3-4 Hours",
      "5-6 Hours",
      "6+ Hours",
    ],
  },
  {
    id: 3,
    question: "When are you most productive?",
    options: [
      "Morning",
      "Afternoon",
      "Evening",
      "Night",
    ],
  },
  {
    id: 4,
    question: "When is your next exam?",
    options: [
      "Within 1 Week",
      "Within 1 Month",
      "Within 3 Months",
      "More than 3 Months",
    ],
  },
];

const PlannerQuestions = ({ onComplete, saveAnswers }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = questions[currentQuestion];

  const handleSelect = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: option,
    }));
  };

  const handleNext = () => {
    if (!answers[question.id]) return;

    if (currentQuestion === questions.length - 1) {
      saveAnswers(answers);
      onComplete();
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl p-8 mx-auto bg-white shadow-md rounded-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-slate-800">
          Question {currentQuestion + 1} of {questions.length}
        </h2>

        <span className="text-sm font-medium text-blue-600">
          {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
        </span>
      </div>

      <h1 className="mb-8 text-3xl font-bold text-slate-800">
        {question.question}
      </h1>

      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full rounded-xl border p-4 text-left transition ${
              answers[question.id] === option
                ? "border-blue-600 bg-blue-50"
                : "border-slate-300 hover:border-blue-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-10">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!answers[question.id]}
        >
          {currentQuestion === questions.length - 1
            ? "Generate Plan"
            : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default PlannerQuestions;