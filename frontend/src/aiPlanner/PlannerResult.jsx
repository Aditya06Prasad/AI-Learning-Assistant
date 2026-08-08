import Button from "../components/Button";
import ReactMarkdown from "react-markdown";

const PlannerResult = ({ studyPlan }) => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center py-10 print:block print:min-h-0 print:py-0 print:m-0">
      <div className="w-full max-w-4xl p-10 bg-white shadow-md rounded-2xl print:shadow-none print:p-0 print:w-full print:max-w-none">
        <div className="flex items-center justify-between mb-8 border-b pb-4 print:hidden">
          <h1 className="text-3xl font-bold text-slate-800">
            🎉 Your Personalized Study Plan
          </h1>
          <Button onClick={() => window.print()}>
            Download PDF
          </Button>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          {studyPlan ? (
            <ReactMarkdown>{studyPlan}</ReactMarkdown>
          ) : (
            <p className="text-slate-500 italic">No study plan data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlannerResult;