import { motion } from "motion/react";
import { Play } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCharacter } from "./AnimatedCharacter";
import mindfulKidsImage from "../assets/Mind.png";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function  HomePage() {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate("/UnitsPage");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <AnimatedBackground />
      <AnimatedCharacter />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <img
          src={mindfulKidsImage}
          alt="Mindful Kids 1"
          className="w-full h-auto drop-shadow-2xl"
        />
      </motion.div>

      {/* زر Play ثابت على اليمين */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="fixed right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-20"
      >
        <motion.button
          onClick={handlePlayClick}
          className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-blue-900 px-6 sm:px-8 py-4 sm:py-5 rounded-full shadow-2xl flex flex-row items-center gap-3 hover:from-yellow-500 hover:to-orange-600 transform transition-all"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            },
          }}
        >
          <motion.div
            className="bg-white/30 p-2 rounded-full"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 3,
                ease: "linear",
              },
            }}
          >
            <Play
              className="w-8 h-8 sm:w-10 sm:h-10"
              fill="currentColor"
            />
          </motion.div>
          <span className="text-xl sm:text-2xl">Lets Play!</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default HomePage;