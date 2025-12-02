import { motion } from "framer-motion";
import { useState } from 'react';
import { Home, PlayCircle, Menu } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { AnimatedCharacter } from './AnimatedCharacter';
import { useParams, useNavigate } from 'react-router-dom';
import StoryWrapper from './StoryWrapper';
import QuizPage from '../units/g1/unitOne/L1/QuizPage';
import logo from "../assets/PreissMurphy Logo-BGSDEhSA (1).svg";

const lessons = [
  { number: 1, color: 'from-blue-400 to-blue-500' },
  { number: 2, color: 'from-green-400 to-green-500' },
  { number: 3, color: 'from-pink-400 to-pink-500' },
];

function VideoPlayerPage() {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showLessonDropdown, setShowLessonDropdown] = useState(false);

  const handleLessonSelect = (lessonNumber) => {
    navigate(`/unit/${unitId}/lesson/${lessonNumber}`);
    setShowLessonDropdown(false); // إخفاء القائمة بعد الاختيار
    setShowLessonDropdown(false); // إخفاء القائمة بعد الاختيار
  };

  const handleBackToUnits = () => {
    navigate('/UnitsPage');
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col ">
      <AnimatedBackground />
      <AnimatedCharacter />

      {/* Main Content Area - Video Player */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <StoryWrapper />
          </motion.div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-[2px]  relative z-10"></div>

      {/* Footer with Home Button and Lesson Buttons */}
      <motion.div
        className="relative z-10 py-4 sm:py-5 px-4 sm:px-6 bg-white border-t-[1px] border-t-black border-t-solid"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-center gap-4">

          {/* LEFT SECTION - Logo */}
          <img
            src={logo}
            alt="J1 Logo"
            style={{ height: "40px", width: "100px" }}
          />

          {/* CENTER SECTION - Units Button */}
          <motion.button
            onClick={handleBackToUnits}
            className="ml-44 px-4 py-2 rounded-xl border font-medium transition-all duration-200 text-sm flex items-center gap-4"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50 text-base" />
            <span className="border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50 text-base">Units</span>
          </motion.button>

          {/* RIGHT SECTION - Lesson Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 ml-96"
          >
            {lessons.map((l) => (
              <button
                key={l.number}
                onClick={() => handleLessonSelect(l.number)}
                className={`
            px-4 py-2 rounded-xl border font-medium transition-all duration-200 text-sm flex items-center gap-4
            ${Number(lessonId) === l.number
                    ? `border-[#6B40C8] text-white bg-gradient-to-r ${l.color}`
                    : "border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50"
                  }
          `}
              >
                <PlayCircle className="w-5 h-5" />
                Lesson {l.number}
              </button>
            ))}
          </motion.div>

        </div>
      </motion.div>

    </div>
  );
}

export default VideoPlayerPage;
