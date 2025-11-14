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
        className="relative w-1/3 h-1/4 overflow-x-auto snap-x snap-proximity flex justify-start items-stretch gap-2"
        style={{ maskImage }}
      >
        <>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <ItemIndicator key={i} i={i} scrollRef={scrollRef} />
          ))}
        </>
      </motion.div>
    </MotionContainer>
  );
}

function ItemIndicator({
  i,
  scrollRef,
}: {
  i: number;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: scrollRef,
    target: targetRef,
    axis: "x",
    offset: ["end start", "start end"],
  });

  return (
    <div
      ref={targetRef}
      className="flex-none min-w-[300px] max-w-[350px] p-4 text-lg font-semibold bg-teal-700 rounded-2xl snap-center"
    >
      <svg className="mr-2 size-[38px] stroke-8 stroke-amber-300 fill-transparent float-left translate-y-2">
        <motion.circle
          cx="50%"
          cy="50%"
          r="15"
          strokeLinecap="round"
          pathLength={scrollXProgress}
        />
      </svg>
      <p>
        [{i}]. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Distinctio, veniam facilis similique eveniet cum vel, natus hic odio
        blanditiis accusantium expedita architecto nesciunt officiis doloremque
        dolor qui vitae fuga totam.
      </p>
    </div>
  );
}

function useImageMask(scrollXProgress: MotionValue<number>) {
  const left = `0%`;
  const leftInset = `10%`;
  const rightInset = `90%`;
  const right = `100%`;
  const transparent = `#0000`;
  const opaque = `#000`;

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
