import { useState } from "react";
import MotionContainer from "../animations/MotionContainer";
import {
  AnimatePresence,
  motion,
  useAnimation,
  type ValueAnimationTransition,
  type Variants,
} from "motion/react";

export default function Test() {
  const transition: ValueAnimationTransition<number> = {
    ease: "easeIn",
    duration: 0.2,
  };
  const divVariants: Variants = {
    open: { opacity: 1, transition: transition },
    close: { opacity: 0, transition: transition },
  };

  const divAnim = useAnimation();
  const [state, setState] = useState("close");

  const handleClick = () => {
    // if (state) {
    //   divAnim.start("close");
    // } else {
    //   divAnim.start("open");
    // }
    // setState((old) => !old);
    if (state === "close") {
      setState("open");
    } else {
      setState("close");
    }
  };

  return (
    <MotionContainer>
      <button className="bg-slate-800 text-lg" onClick={handleClick}>
        Toggle
      </button>
      <motion.div
        initial="close"
        // exit="close"
        variants={divVariants}
        // animate={divAnim}
        animate={state}
        className="bg-amber-300 size-20"
      ></motion.div>
    </MotionContainer>
  );
}
