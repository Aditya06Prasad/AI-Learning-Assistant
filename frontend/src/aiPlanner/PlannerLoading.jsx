import { useEffect } from "react";
import Loader from "../components/Loader";

const PlannerLoading = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex min-h-[75vh] items-center justify-center">
      <div className="w-full max-w-3xl p-10 text-center bg-white shadow-md rounded-2xl">
        <Loader />

        <h1 className="mt-6 text-3xl font-bold text-slate-800">
          Generating Your Study Plan...
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Please wait while we prepare your personalized study plan.
        </p>
      </div>
    </div>
  );
};

export default PlannerLoading;