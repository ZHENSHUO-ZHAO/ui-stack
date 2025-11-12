import { useState } from "react";
import MotionContainer from "./MotionContainer";
import { motion } from "motion/react";

const origins = [
  {
    text: "Columbia",
    bgColor: "bg-amber-200",
    textColor: "data-selected:text-amber-400",
  },
  {
    text: "Ethiopia",
    bgColor: "bg-teal-200",
    textColor: "data-selected:text-teal-400",
  },
  {
    text: "Peru",
    bgColor: "bg-sky-200",
    textColor: "data-selected:text-sky-400",
  },
  {
    text: "Basil",
    bgColor: "bg-lime-200",
    textColor: "data-selected:text-lime-400",
  },
  {
    text: "Kenya",
    bgColor: "bg-pink-200",
    textColor: "data-selected:text-pink-400",
  },
];

export default function AnimatedTabs() {
  const [selectedOrigin, setOrigin] = useState(origins[0]);

  return (
    <MotionContainer>
      <div className="w-1/3 flex justify-between items-start">
        {origins.map((o) => (
          <div onClick={() => setOrigin(o)} className="flex-1">
            <div
              data-selected={selectedOrigin === o ? true : null}
              className={`text-center text-lg font-semibold rounded-tl-lg rounded-tr-lg text-slate-400 hover:bg-slate-700 ${o.textColor} transition duration-500`}
            >
              {o.text}
            </div>
            {selectedOrigin === o && (
              <motion.div
                layoutId="underline"
                className={`h-1 w-full ${o.bgColor}`}
              />
            )}
          </div>
        ))}
      </div>
    </MotionContainer>
  );
}
