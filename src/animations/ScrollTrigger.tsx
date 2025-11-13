import { useRef } from "react";
import MotionContainer from "./MotionContainer";
import {
  motion,
  useMotionTemplate,
  useScroll,
  type Variants,
} from "motion/react";

export default function ScrollTrigger() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainer });
  const loaderWidth = useMotionTemplate`calc(${scrollYProgress} * 100%)`;

  const cardVariants: Variants = {
    offScreen: { opacity: 0 },
    onScreen: { opacity: 1, transition: { duration: 2 } },
  };

  return (
    <MotionContainer>
      <motion.div
        className="origin-left z-10 fixed left-0 top-0 h-2 bg-amber-300"
        style={{ width: loaderWidth }}
      />
      <div className="origin-left z-5 fixed inset-x-0 top-2 h-6 bg-amber-600/10 backdrop-blur-md" />
      <div ref={scrollContainer} className="w-1/5 h-full py-4 overflow-y-auto">
        <div className="flex flex-col items-center gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              initial="offscreen"
              whileInView="onScreen"
              viewport={{ amount: "some", once: true }}
              variants={cardVariants}
              className="bg-amber-950 opacity-0 rounded-2xl p-4 text-2xl"
            >
              [{i}]. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Ex, qui? Dignissimos, repudiandae! Porro, est tempore. Velit ipsum
              voluptatem aut natus? Nisi reprehenderit minus, debitis autem
              sapiente animi temporibus dicta ab?
            </motion.div>
          ))}
        </div>
      </div>
    </MotionContainer>
  );
}
