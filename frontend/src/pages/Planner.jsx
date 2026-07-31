import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

const Planner = () => {

  const [topic, setTopic] = useState("");

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        AI Study Planner
      </h1>

      <Card>

        <textarea
          rows={6}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter what you want to study..."
          className="w-full p-4 border rounded-lg outline-none resize-none"
        />

        <div className="mt-5">
          <Button>
            Generate Study Plan
          </Button>
        </div>

      </Card>

      <Card>

        <h2 className="mb-4 text-xl font-semibold">
          AI Response
        </h2>

        <p className="text-gray-500">
          Your personalized study plan will appear here.
        </p>

      </Card>

    </div>
  );
};

export default Planner;