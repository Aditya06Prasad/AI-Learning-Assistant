import { useState, useEffect, useCallback } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import api from "../services/api";

const interleaveBySubject = (tasks) => {
  const grouped = {};
  tasks.forEach((t) => {
    const sub = t.subject?._id || "none";
    if (!grouped[sub]) grouped[sub] = [];
    grouped[sub].push(t);
  });

  const interleaved = [];
  let added = true;
  while (added) {
    added = false;
    // Shuffle the keys to provide some variation if regenerated
    const keys = Object.keys(grouped).sort(() => Math.random() - 0.5);
    for (const sub of keys) {
      if (grouped[sub].length > 0) {
        interleaved.push(grouped[sub].shift());
        added = true;
      }
    }
  }
  return interleaved;
};

const isOverdue = (date) => {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) < today;
};

const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const d = new Date(date);
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

const isTomorrow = (date) => {
  if (!date) return false;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const d = new Date(date);
  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  );
};

const Planner = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plan, setPlan] = useState({ today: [], tomorrow: [], weekly: [] });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/tasks");
      const pendingTasks = res.data.filter((t) => !t.completed);
      setTasks(pendingTasks);
      generatePlan(pendingTasks);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const generatePlan = (availableTasks) => {
    const todayPlan = [];
    const tomorrowPlan = [];
    let unassigned = [];

    availableTasks.forEach((task) => {
      if (isOverdue(task.dueDate) || isToday(task.dueDate)) {
        todayPlan.push(task);
      } else if (isTomorrow(task.dueDate)) {
        tomorrowPlan.push(task);
      } else {
        unassigned.push(task);
      }
    });

    // Group unassigned by priority
    const high = unassigned.filter((t) => t.priority === "High");
    const medium = unassigned.filter((t) => t.priority === "Medium" || (!t.priority && t.priority !== "Low"));
    const low = unassigned.filter((t) => t.priority === "Low");

    // Interleave subjects within each priority
    const interleavedUnassigned = [
      ...interleaveBySubject(high),
      ...interleaveBySubject(medium),
      ...interleaveBySubject(low),
    ];

    // Fill capacity
    const TODAY_CAPACITY = 5;
    const TOMORROW_CAPACITY = 5;

    while (todayPlan.length < TODAY_CAPACITY && interleavedUnassigned.length > 0) {
      todayPlan.push(interleavedUnassigned.shift());
    }

    while (tomorrowPlan.length < TOMORROW_CAPACITY && interleavedUnassigned.length > 0) {
      tomorrowPlan.push(interleavedUnassigned.shift());
    }

    setPlan({
      today: todayPlan,
      tomorrow: tomorrowPlan,
      weekly: interleavedUnassigned,
    });
  };

  const handleMarkComplete = async (taskId) => {
    try {
      await api.put(`/api/tasks/${taskId}`, { completed: true });
      // Remove from current plan UI immediately for snappy response
      const updatedTasks = tasks.filter((t) => t._id !== taskId);
      setTasks(updatedTasks);
      generatePlan(updatedTasks);
    } catch (err) {
      console.error(err);
      alert("Failed to mark task complete");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <EmptyState title="Error" description={error} />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <EmptyState
          title="All Caught Up!"
          description="You don't have any pending tasks to schedule. Take a break!"
        />
      </div>
    );
  }

  const renderTaskList = (taskList, title) => {
    if (taskList.length === 0) return null;
    return (
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-slate-800">{title}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {taskList.map((task) => (
            <Card key={task._id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{task.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority || "Medium"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {task.subject?.name || "No Subject"}
                </p>
                {task.dueDate && (
                  <p className={`mt-2 text-sm ${isOverdue(task.dueDate) ? "text-red-600 font-semibold" : "text-slate-600"}`}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
                {task.description && (
                  <p className="mt-2 text-sm text-slate-700 line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Button fullWidth onClick={() => handleMarkComplete(task._id)}>
                  Mark Complete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            💡 AI Study Planner
          </h1>
          <p className="mt-2 text-gray-500">
            Your algorithmically optimized study schedule.
          </p>
        </div>
        <Button onClick={() => generatePlan(tasks)}>Regenerate Plan</Button>
      </div>

      {renderTaskList(plan.today, "Today's Plan")}
      {renderTaskList(plan.tomorrow, "Tomorrow's Plan")}
      {renderTaskList(plan.weekly, "Upcoming (Weekly) Plan")}
    </div>
  );
};

export default Planner;