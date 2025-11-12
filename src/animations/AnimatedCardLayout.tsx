import { useState } from "react";
import MotionContainer from "./MotionContainer";
import { motion } from "motion/react";

const cards = [
  { bgColor: "bg-teal-800", hoverColor: "hover:bg-teal-600" },
  { bgColor: "bg-amber-800", hoverColor: "hover:bg-amber-600" },
  { bgColor: "bg-indigo-800", hoverColor: "hover:bg-indigo-600" },
  { bgColor: "bg-pink-800", hoverColor: "hover:bg-pink-600" },
];

export default function AnimatedCardLayout() {
  const [cardId, setCardId] = useState(-1);

  return (
    <MotionContainer>
      <div className="w-1/3 grid grid-cols-2 gap-4">
        {cards.map((c, i) => (
          <div onClick={() => setCardId(i)} key={i}>
            {cardId !== i ? (
              <>
                <motion.div
                  layoutId={`div${i}`}
                  className={`full-w ${c.bgColor} text-lg rounded-xl p-4 ${c.hoverColor}`}
                  transition={{ type: "spring", stiffness: 600, damping: 25 }}
                >
                  {i}. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Sunt ad omnis libero corrupti harum illo est dicta nobis, sed
                  cupiditate numquam, officiis minus incidunt veritatis suscipit
                  asperiores a, possimus perspiciatis!
                </motion.div>
              </>
            ) : (
              <>
                <div />
                <motion.div
                  onTap={() => setCardId(-1)}
                  className="fixed inset-0 bg-black/50 z-10"
                  initial={{ backdropFilter: "blur(0px)" }}
                  animate={{ backdropFilter: "blur(4px)" }}
                  exit={{ backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  onTap={() => setCardId(-1)}
                  layoutId={`div${i}`}
                  className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-1/4 ${c.bgColor} text-lg rounded-xl p-6 ${c.hoverColor} z-20`}
                  transition={{ type: "spring", stiffness: 600, damping: 25 }}
                >
                  {i}. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Sunt ad omnis libero corrupti harum illo est dicta nobis, sed
                  cupiditate numquam, officiis minus incidunt veritatis suscipit
                  asperiores a, possimus perspiciatis!
                </motion.div>
              </>
            )}
          </div>
        ))}
      </div>
    </MotionContainer>
  );
}
