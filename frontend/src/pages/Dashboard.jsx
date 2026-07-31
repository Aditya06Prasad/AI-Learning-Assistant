import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import api from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/api/dashboard");
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  if (!data || (data.totalSubjects === 0 && data.totalTasks === 0)) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <EmptyState 
          title="Welcome to your Dashboard!" 
          description="You don't have any subjects or tasks yet. Create some to see your statistics here." 
        />
      </div>
    );
  }

  const stats = [
    {
      title: "Subjects",
      value: data.totalSubjects,
      color: "bg-blue-500",
    },
    {
      title: "Pending Tasks",
      value: data.pendingTasks,
      color: "bg-orange-500",
    },
    {
      title: "Completed",
      value: data.completedTasks,
      color: "bg-green-500",
    },
    {
      title: "Total Tasks",
      value: data.totalTasks,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Welcome back! Here&apos;s your study overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.title}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">{item.title}</p>
                <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
              </div>
              <div className={`${item.color} w-12 h-12 rounded-xl`} />
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="mb-4 text-xl font-semibold">Overall Progress</h2>
        <div className="w-full h-4 bg-gray-200 rounded-full">
          <div
            className="h-4 bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${data.completionPercentage}%` }}
          />
        </div>
        <p className="mt-3 text-gray-600">
          {data.completionPercentage}% of your tasks completed.
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-xl font-semibold">Upcoming Deadlines</h2>
          {data.upcomingDeadlines.length === 0 ? (
            <p className="text-gray-500">No upcoming deadlines.</p>
          ) : (
            <div className="space-y-4">
              {data.upcomingDeadlines.map((task) => (
                <div key={task._id} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.subject?.name || "No Subject"}</p>
                  </div>
                  <span className="text-sm text-red-500">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-semibold">Recent Subjects</h2>
          {data.recentSubjects.length === 0 ? (
            <p className="text-gray-500">No recent subjects.</p>
          ) : (
            <div className="space-y-4">
              {data.recentSubjects.map((subject) => (
                <div key={subject._id} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <h3 className="font-medium">{subject.name}</h3>
                  <span className="text-sm text-gray-500">
                    {subject.progress}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
