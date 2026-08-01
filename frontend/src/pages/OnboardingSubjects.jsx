import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { getSubjectsForCourse } from "../data/subjectsConfig";

const OnboardingSubjects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.selectedClass || "";
  const educationLevel = location.state?.educationLevel || "";
  const board = location.state?.selectedBoard || "";

  // Dynamic subjects list based on the selected course (and board if applicable)
  const courseSubjects = useMemo(() => getSubjectsForCourse(course, board), [course, board]);

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect back if accessed directly without course
  useEffect(() => {
    if (!course) {
      navigate("/onboarding");
    }
  }, [course, navigate]);

  const toggleSubject = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleContinue = () => {
    if (selectedSubjects.length > 0) {
      // In the future, send this to backend.
      // For now, do nothing per instructions.
      console.log("Selected subjects for", course, ":", selectedSubjects);
    }
  };

  const filteredSubjects = useMemo(() => {
    return courseSubjects.filter((subject) =>
      subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courseSubjects, searchQuery]);

  return (
    <div className="min-h-screen bg-pastel-cute font-sans py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-6rem)]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 flex items-center justify-center gap-3">
            📚 Select Your Subjects
          </h1>
          <p className="text-lg text-slate-500 mb-2">
            Choose all subjects you are currently studying.
          </p>
          {course && (
            <div className="inline-block bg-pastel-purple/10 px-4 py-1.5 rounded-full shadow-sm text-sm font-bold text-pastel-purple mt-2 border border-pastel-purple/20 mr-2">
              Course: {course}
            </div>
          )}
          {board && (
            <div className="inline-block bg-pastel-green/10 px-4 py-1.5 rounded-full shadow-sm text-sm font-bold text-pastel-green mt-2 border border-pastel-green/20 mr-2">
              Board: {board}
            </div>
          )}
          <div className="inline-block bg-white px-4 py-1.5 rounded-full shadow-sm text-sm font-semibold text-slate-600 mt-2 border border-slate-200">
            Selected: <span className="text-pastel-purple">{selectedSubjects.length}</span> / {courseSubjects.length}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <InputField
            id="search"
            type="text"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Subjects List */}
        <div className="flex-1">
          <Card className="p-6 md:p-8">
            {filteredSubjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSubjects.map((subject) => {
                  const isSelected = selectedSubjects.includes(subject);
                  return (
                    <button
                      key={subject}
                      onClick={() => toggleSubject(subject)}
                      className={`w-full text-left flex items-center p-4 rounded-xl border-2 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-purple group ${
                        isSelected
                          ? "bg-pastel-purple/10 border-pastel-purple shadow-sm"
                          : "bg-white border-slate-200 hover:border-pastel-purple/50 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-md border-2 mr-4 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-pastel-purple border-pastel-purple"
                            : "bg-white border-slate-300 group-hover:border-pastel-purple/50"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`font-medium ${
                          isSelected ? "text-slate-900" : "text-slate-600"
                        }`}
                      >
                        {subject}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-12">
                No subjects found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </Card>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex items-center justify-between gap-4 sticky bottom-6 bg-pastel-cute/90 backdrop-blur-sm p-4 rounded-2xl border border-white shadow-sm z-10">
          <Button
            type="button"
            onClick={() => navigate("/onboarding", { state: { selectedClass: course, educationLevel, selectedBoard: board } })}
            className="bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200"
          >
            ← Previous
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={selectedSubjects.length === 0}
            className={`min-w-[120px] ${
              selectedSubjects.length === 0 ? "opacity-50 cursor-not-allowed" : "shadow-lg shadow-pastel-purple/50"
            }`}
          >
            Continue →
          </Button>
        </div>

      </div>
    </div>
  );
};

export default OnboardingSubjects;
