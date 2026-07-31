import Card from "../components/Card";

const stats = [
  {
    title: "Subjects",
    value: 6,
    color: "bg-blue-500",
  },
  {
    title: "Pending Tasks",
    value: 14,
    color: "bg-orange-500",
  },
  {
    title: "Completed",
    value: 38,
    color: "bg-green-500",
  },
  {
    title: "Study Streak",
    value: "12 Days",
    color: "bg-purple-500",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back! Here&apos;s your study overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.title}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {item.value}
                </h2>
              </div>

              <div className={`${item.color} w-12 h-12 rounded-xl`} />
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="mb-4 text-xl font-semibold">
          Today&apos;s Progress
        </h2>

        <div className="w-full h-4 bg-gray-200 rounded-full">
          <div
            className="h-4 bg-blue-600 rounded-full"
            style={{ width: "65%" }}
          />
        </div>

        <p className="mt-3 text-gray-600">
          65% of today&apos;s study goal completed.
        </p>
      </Card>

    </div>
  );
};

export default Dashboard;
