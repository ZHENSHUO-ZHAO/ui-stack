import { motion } from "motion/react";
import MotionContainer from "./MotionContainer";

export default function DraggableItem() {
  return (
    <MotionContainer>
      <div>
        <p>This is the top line.</p>
        <motion.div
          drag="x"
          className="bg-amber-400 size-15 flex justify-center items-center rounded-lg"
          whileDrag={{
            scale: 1.2,
            boxShadow: "0px 0px 10px oklch(0.828 0.189 84.429)",
          }}
        >
          <button
            onPointerDownCapture={(e) => e.stopPropagation()}
            className="bg-indigo-500 rounded-md p-2 hover:bg-indigo-400"
          >
            A
          </button>
        </motion.div>
        <p>This is the bottom line.</p>
      </div>
    </MotionContainer>
  );
}
