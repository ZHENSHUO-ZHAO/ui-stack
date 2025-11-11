import MotionContainer from "./MotionContainer";
import { motion } from "motion/react";

export default function RotateBox() {
  return (
    <MotionContainer>
      <motion.div
        className="origin-center size-20 border-2 border-t-amber-300 border-r-sky-500 border-b-teal-500 border-l-purple-400 b bg-pink-600 rounded-2xl"
        initial={{ rotate: 0, scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          duration: 1,
          delay: 1,
          scale: {
            ease: "easeInOut",
            visualDuration: 1,
            bounce: 0.5,
            // delay: 1,
          },
        }}
        whileHover={{
          scale: 1.2,
          transition: { ease: "easeOut", duration: 1, delay: 0 },
        }}
        whileTap={{
          scale: 0.8,
          transition: { ease: "easeOut", duration: 0.3 },
        }}
      />
    </MotionContainer>
  );
}
