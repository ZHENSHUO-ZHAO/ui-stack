import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { motion } from "motion/react";
import type { nextButtonPropType } from "./carouselTypes";

export default function NextButton({ isToRight, onNext }: nextButtonPropType) {
  return (
    <motion.button
      className="size-11 rounded-full bg-white/50 flex justify-center items-center mx-4"
      whileHover={{
        boxShadow: "0 0 3px 2px rgba(255,255,255,0.5)",
      }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onNext(isToRight)}
    >
      {isToRight ? (
        <ChevronRightIcon className="size-8" />
      ) : (
        <ChevronLeftIcon className="size-8" />
      )}
    </motion.button>
  );
}
