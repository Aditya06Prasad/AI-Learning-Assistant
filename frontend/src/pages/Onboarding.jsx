import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(location.state?.selectedClass || null);
  const [educationLevel, setEducationLevel] = useState(location.state?.educationLevel || null);
  const [selectedBoard, setSelectedBoard] = useState(location.state?.selectedBoard || null);
  
  // sidebarStep can be "board" or "class"
  const [sidebarStep, setSidebarStep] = useState("class");

  const handleEducationSelect = (level) => {
    setEducationLevel(level);
    setSelectedClass(null); // reset selection when opening a new level
    setSelectedBoard(null);
    
    if (level === "1-10") {
      setSidebarStep("board");
    } else {
      setSidebarStep("class");
    }
    setIsSidebarOpen(true);
  };

  // Close sidebar on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Determine sidebar options based on selected level and step
  let options = [];
  let sidebarTitle = "Select your class";
  const isBoardStep = sidebarStep === "board";

  if (isBoardStep) {
    options = ["CBSE", "ICSE"];
    sidebarTitle = "Select Your Education Board";
  } else {
    if (educationLevel === "1-10") {
      options = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
    } else if (educationLevel === "11-12") {
      options = ["Class 11", "Class 12"];
    } else if (educationLevel === "Undergraduate") {
      options = ["B.Tech (CSE)", "B.Pharma", "MBA"];
      sidebarTitle = "Select your program";
    }
  }

  const isContinueDisabled = isBoardStep ? !selectedBoard : !selectedClass;

  const handleSidebarContinue = () => {
    if (isBoardStep) {
      setSidebarStep("class");
    } else {
      if (selectedClass) {
        navigate("/onboarding/subjects", { 
          state: { selectedClass, educationLevel, selectedBoard } 
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-pastel-cute font-sans overflow-x-hidden">
      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-3">
            🎓 Tell us about your education
          </h1>
          <p className="text-lg text-slate-500 mb-16 px-4">
            Select your current education level to personalize your learning experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <button
              onClick={() => handleEducationSelect("1-10")}
              className="text-left group outline-none"
            >
              <Card className="h-full transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border-2 border-transparent group-focus:border-pastel-purple group-hover:border-pastel-purple flex flex-col items-center justify-center py-12 px-6">
                <div className="text-6xl mb-6">🎒</div>
                <h2 className="text-2xl font-bold text-slate-800 text-center">Class 1 – 10</h2>
              </Card>
            </button>

            <button
              onClick={() => handleEducationSelect("11-12")}
              className="text-left group outline-none"
            >
              <Card className="h-full transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border-2 border-transparent group-focus:border-pastel-green group-hover:border-pastel-green flex flex-col items-center justify-center py-12 px-6">
                <div className="text-6xl mb-6">📚</div>
                <h2 className="text-2xl font-bold text-slate-800 text-center">Class 11 – 12</h2>
              </Card>
            </button>

            <button
              onClick={() => handleEducationSelect("Undergraduate")}
              className="text-left group outline-none"
            >
              <Card className="h-full transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border-2 border-transparent group-focus:border-pastel-yellow group-hover:border-pastel-yellow flex flex-col items-center justify-center py-12 px-6">
                <div className="text-6xl mb-6">🎓</div>
                <h2 className="text-2xl font-bold text-slate-800 text-center">Undergraduate</h2>
              </Card>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Right Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl border-l-2 border-pastel-purple/20 transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8 sticky top-0 bg-white pt-2 pb-4 z-10">
            <h2 className="text-2xl font-bold text-slate-800">{sidebarTitle}</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-purple"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          <div className={`grid gap-4 ${isBoardStep ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
            {options.map((option) => {
              const isSelected = isBoardStep ? selectedBoard === option : selectedClass === option;
              return (
                <button
                  key={option}
                  onClick={() => {
                    if (isBoardStep) setSelectedBoard(option);
                    else setSelectedClass(option);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all font-semibold text-center outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-purple ${
                    isSelected
                      ? "bg-pastel-purple text-slate-900 border-pastel-purple shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:border-pastel-purple/50 hover:bg-slate-50"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="mt-12 sticky bottom-0 bg-white pt-4 pb-8">
            <Button
              fullWidth
              disabled={isContinueDisabled}
              onClick={handleSidebarContinue}
              className={isContinueDisabled ? "opacity-50 cursor-not-allowed" : "shadow-lg shadow-pastel-purple/50"}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
