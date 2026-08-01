import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import api from "../services/api";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await api.get("/api/users/profile");
        setSubjects(data.subjects || []);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-pulse text-xl text-slate-500 font-semibold">Loading subjects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-slate-800">
          📚 Subjects
        </h1>
        <Link to="/profile">
          <Button className="bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 shadow-sm">
            Update Subjects
          </Button>
        </Link>
      </div>

      {subjects.length === 0 ? (
        <Card className="p-12 text-center flex flex-col items-center justify-center min-h-[300px] border-dashed border-2 border-slate-300 bg-slate-50/50">
          <div className="text-6xl mb-6 opacity-50">📭</div>
          <h2 className="text-2xl font-bold text-slate-700 mb-4">No subjects found.</h2>
          <p className="text-slate-500 mb-8 max-w-md">
            Complete your onboarding or add subjects to start learning.
          </p>
          <Link to="/profile">
            <Button className="shadow-lg shadow-pastel-purple/50 px-8">Update Subjects</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject, index) => (
            <Card key={index} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group border-2 border-transparent hover:border-pastel-purple/30">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-pastel-purple transition-colors">
                  {subject}
                </h2>
                <div className="w-10 h-10 rounded-full bg-pastel-purple/10 flex items-center justify-center text-pastel-purple shadow-sm">
                  📖
                </div>
              </div>

              <div className="w-full h-3 mt-6 bg-slate-100 rounded-full shadow-inner overflow-hidden">
                <div
                  className="h-full bg-pastel-purple rounded-full shadow-sm relative overflow-hidden"
                  style={{ width: "0%" }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -translate-x-full" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-slate-500 font-semibold text-sm">
                  0% Completed
                </p>
                <span className="text-xs font-bold text-pastel-purple bg-pastel-purple/10 px-2 py-1 rounded-md">
                  Not started
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subjects;