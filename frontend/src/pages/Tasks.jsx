import Card from "../components/Card";
import Button from "../components/Button";

const tasks = [
  {
    id: 1,
    task: "Complete Binary Tree",
    subject: "DSA",
    status: "Pending",
  },
  {
    id: 2,
    task: "Study Deadlock",
    subject: "OS",
    status: "Completed",
  },
  {
    id: 3,
    task: "Normalization",
    subject: "DBMS",
    status: "Pending",
  },
];

const Tasks = () => {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          ✅ Tasks
        </h1>

        <Button>
          + Add Task
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  {task.task}
                </h2>

                <p className="text-gray-500">
                  {task.subject}
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full font-semibold shadow-sm text-sm ${
                  task.status === "Completed"
                    ? "bg-pastel-green text-slate-800"
                    : "bg-pastel-yellow text-slate-800"
                }`}
              >
                {task.status}
              </span>

            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default Tasks;