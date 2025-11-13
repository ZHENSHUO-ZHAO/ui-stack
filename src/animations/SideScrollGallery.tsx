import {
  animate,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type ValueAnimationTransition,
} from "motion/react";
import MotionContainer from "./MotionContainer";
import { useRef } from "react";
import { motion } from "motion/react";

export default function SideScrollGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const maskImage = useImageMask(scrollXProgress);

  return (
    <MotionContainer>
      <motion.div
        ref={scrollRef}
        className="w-1/3 h-1/4 overflow-x-auto snap-x snap-proximity"
        style={{ maskImage }}
      >
        <div className="flex justify-start items-stretch gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div className="flex-[1_0_300px] p-4 text-lg font-semibold bg-teal-700 rounded-2xl snap-center">
              [{i}]. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Distinctio, veniam facilis similique eveniet cum vel, natus hic
              odio blanditiis accusantium expedita architecto nesciunt officiis
              doloremque dolor qui vitae fuga totam.
            </div>
          ))}
        </div>
      </motion.div>
    </MotionContainer>
  );
}

const left = `0%`;
const leftInset = `10%`;
const rightInset = `90%`;
const right = `100%`;
const transparent = `#0000`;
const opaque = `#000`;

function useImageMask(scrollXProgress: MotionValue<number>) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  const transition: ValueAnimationTransition<string> = {
    duration: 0.2,
    ease: "easeInOut",
  };
  useMotionValueEvent(scrollXProgress, "change", (value: number) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`,
        transition
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`,
        transition
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`,
        transition
      );
    }
  });

  return maskImage;
}
