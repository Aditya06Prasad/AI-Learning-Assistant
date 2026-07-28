import Card from "../components/Card";
import Button from "../components/Button";

const subjects = [
  {
    id: 1,
    name: "Data Structures",
    progress: 70,
  },
  {
    id: 2,
    name: "Operating System",
    progress: 40,
  },
  {
    id: 3,
    name: "DBMS",
    progress: 55,
  },
  {
    id: 4,
    name: "Java",
    progress: 90,
  },
];

const Subjects = () => {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Subjects
        </h1>

        <Button>
          + Add Subject
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <Card key={subject.id}>
            <h2 className="text-xl font-semibold">
              {subject.name}
            </h2>

            <div className="w-full h-3 mt-5 bg-gray-200 rounded-full">
              <div
                className="h-3 bg-blue-600 rounded-full"
                style={{
                  width: `${subject.progress}%`,
                }}
              />
            </div>

            <p className="mt-3 text-gray-500">
              {subject.progress}% Completed
            </p>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default Subjects;