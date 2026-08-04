import Button from "../components/Button";

const PlannerWelcome = ({ onStart }) => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center">
      <div className="w-full max-w-3xl p-10 text-center bg-white shadow-md rounded-2xl">
        <h1 className="text-4xl font-bold text-slate-800">
          AI Study Planner
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Create a personalized study plan tailored to your goals, schedule,
          and learning preferences.
        </p>

        <Button className="mt-8" onClick={onStart}>
          Start Planning
        </Button>
      </div>
    </div>
  );
};

export default PlannerWelcome;