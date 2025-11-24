import { motion, useDragControls } from "motion/react";
import MotionContainer from "./MotionContainer";
import { useRef } from "react";

export default function DraggableItem() {
  const dragContainer = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    console.log("start");
    dragControls.start(event, { snapToCursor: true });
  };

  return (
    <MotionContainer>
      <div>
        <p>This is the top line.</p>
        <motion.div
          ref={dragContainer}
          className="w-full h-[50vh] bg-indigo-900 rounded-lg"
        >
          <motion.div
            drag
            className="bg-amber-400 size-15 flex justify-center items-center rounded-lg"
            whileDrag={{
              scale: 1.2,
              boxShadow: "0px 0px 10px oklch(0.828 0.189 84.429)",
              cursor: "grabbing",
            }}
            dragTransition={{
              // min: 0,
              // max: 100,
              bounceStiffness: 500,
              bounceDamping: 20,
            }}
            dragConstraints={dragContainer}
            // dragListener={false}
            // dragControls={dragControls}
            // onPointerDown={onPointerDown}
            onDrag={(event, info) =>
              console.log(`${JSON.stringify(event)}, ${JSON.stringify(info)}`)
            }
          >
            <button
              onPointerDownCapture={(e) => e.stopPropagation()}
              className="bg-indigo-500 rounded-md p-2 hover:bg-indigo-400"
            >
              A
            </button>
          </motion.div>
        </motion.div>
        <p>This is the bottom line.</p>
      </div>
    </MotionContainer>
  );
}
