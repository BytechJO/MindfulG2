import { Suspense, lazy, useState } from "react";
import { motion } from "motion/react";
import { Home, PlayCircle, Menu } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCharacter } from "./AnimatedCharacter";
import { useParams, useNavigate } from "react-router-dom";

const pages = {
  "One-1": lazy(() => import("../units/g1/unitOne/L1/QuizPage.jsx")),
  "One-2": lazy(() => import("../units/g1/unitOne/L2/QuizPage.jsx")),
  "One-3": lazy(() => import("../units/g1/unitOne/L3/QuizPage.jsx")),

  "Two-1": lazy(() => import("../units/g1/unitTwo/L1/QuizPage.jsx")),
  "Two-2": lazy(() => import("../units/g1/unitTwo/L2/QuizPage.jsx")),
  "Two-3": lazy(() => import("../units/g1/unitTwo/L3/QuizPage.jsx")),

  "Three-1": lazy(() => import("../units/g1/unitThree/L1/QuizPage.jsx")),
  "Three-2": lazy(() => import("../units/g1/unitThree/L2/QuizPage.jsx")),
  "Three-3": lazy(() => import("../units/g1/unitThree/L3/QuizPage.jsx")),

  "Four-1": lazy(() => import("../units/g1/unitFour/L1/QuizPage.jsx")),
  "Four-2": lazy(() => import("../units/g1/unitFour/L2/QuizPage.jsx")),
  "Four-3": lazy(() => import("../units/g1/unitFour/L3/QuizPage.jsx")),
};

const lessons = [
  { number: 1, color: "from-blue-400 to-blue-500" },
  { number: 2, color: "from-green-400 to-green-500" },
  { number: 3, color: "from-pink-400 to-pink-500" },
];

export default function VideoPlayerPage() {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showLessonDropdown, setShowLessonDropdown] = useState(false);

  const key = `${unitId}-${lessonId}`;
  const Component = pages[key];

  const handleLessonSelect = (lessonNumber) => {
    navigate(`/unit/${unitId}/lesson/${lessonNumber}`);
    setShowLessonDropdown(false); // إخفاء القائمة بعد الاختيار
  };

  const handleBackToUnits = () => {
    navigate("/UnitsPage");
  };

  if (!Component) return <div>Quiz Not Found</div>;

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <AnimatedBackground />
      <AnimatedCharacter />

      <div className="flex-1 p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full h-full"
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          </motion.div>
        </div>
      </div>

      <div className="w-full h-[2px] bg-white/30 relative z-10"></div>

      <motion.div
        className="relative z-10 py-4 sm:py-5 px-4 sm:px-6"
        style={{ backgroundColor: "#4776b7" }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Home Button */}
          <motion.button
            onClick={handleBackToUnits}
            className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full shadow-lg flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(0,0,0,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-base sm:text-lg">Units</span>
          </motion.button>

          {/* Lesson Buttons - Large Screens */}
          <div className="hidden sm:flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            {lessons.map((l) => (
              <button
                key={l.number}
                onClick={() => handleLessonSelect(l.number)}
                className={`px-6 py-3 rounded-xl flex items-center gap-2 ${
                  Number(lessonId) === l.number
                    ? `bg-gradient-to-r ${l.color} text-white`
                    : "bg-white"
                }`}
              >
                <PlayCircle />
                Lesson {l.number}
              </button>
            ))}
          </div>

          {/* Lesson Dropdown - Small Screens */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setShowLessonDropdown(!showLessonDropdown)}
              className="bg-white px-4 py-3 rounded-full flex items-center gap-2 shadow-lg"
            >
              <Menu />
              Lessons
            </button>

            {showLessonDropdown && (
              <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-72 bg-white rounded-xl shadow-xl flex flex-col z-50 p-2">
                {lessons.map((l) => (
                  <button
                    key={l.number}
                    onClick={() => handleLessonSelect(l.number)}
                    className={`px-4 py-2 text-left rounded-lg flex items-center gap-2 ${
                      Number(lessonId) === l.number
                        ? `bg-gradient-to-r ${l.color} text-white`
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <PlayCircle />
                    Lesson {l.number}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
