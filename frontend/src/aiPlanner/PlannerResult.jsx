import Button from "../components/Button";

const PlannerResult = () => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center">
      <div className="w-full max-w-3xl p-10 text-center bg-white shadow-md rounded-2xl">
        <h1 className="text-3xl font-bold text-slate-800">
          🎉 Study Plan Generated
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Your personalized AI study plan will appear here after we integrate
          the backend and Gemini API.
        </p>

        <Button className="mt-8">
          View Study Plan
        </Button>
      </div>
    </div>
  );
};

export default PlannerResult;