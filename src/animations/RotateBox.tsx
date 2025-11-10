import MotionContainer from "./MotionContainer";
import { motion } from "motion/react";

export default function RotateBox() {
  return (
    <MotionContainer>
      <motion.div
        className="size-20 border-2 border-t-amber-300 border-r-sky-500 border-b-teal-500 border-l-purple-400 b bg-pink-600 rounded-2xl"
        initial={{ rotate: 0 }}
        animate={{ rotate: 270 }}
        transition={{ duration: 3 }}
      />
    </MotionContainer>
  );
}
