import { motion } from "framer-motion";

import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCharacter } from "./AnimatedCharacter";
import { useNavigate } from 'react-router-dom';
// const units = [
//   { number: 1, color: "from-blue-400 to-blue-500" },
//   { number: 2, color: "from-green-400 to-green-500" },
//   { number: 3, color: "from-pink-400 to-pink-500" },
//   { number: 4, color: "from-orange-400 to-orange-500" },
// ];
const units = [
  {id: "One", path: "/unit/One/lesson/1", color: "from-blue-400 to-blue-500"},
  {id: "Two", path: "/unit/Two/lesson/1", color: "from-green-400 to-green-500" },
  {id: "Three", path: "/unit/Three/lesson/1", color: "from-pink-400 to-pink-500"},
  {id: "Four", path: "/unit/Four/lesson/1", color: "from-orange-400 to-orange-500"}
];

function UnitsPage({ onUnitSelect }) {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <AnimatedBackground />
      <AnimatedCharacter />

      <div className="max-w-4xl w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 text-center mb-6 sm:mb-8 md:mb-10 text-2xl sm:text-3xl md:text-4xl px-4"
        >
          Choose a Unit
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-4">
          {units.map((unit, index) => (
            <motion.button
              key={unit.id}
              onClick={() => navigate(unit.path)}
              className={`bg-gradient-to-br ${unit.color} p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl text-white relative overflow-hidden`}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-white opacity-10 rounded-full"></div>

              <div className="relative z-10">
                <span className="text-xl sm:text-2xl md:text-3xl">
                  Unit {unit.id}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UnitsPage;