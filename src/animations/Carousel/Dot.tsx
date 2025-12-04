import { motion } from "motion/react";
import type { dotPropType } from "./carouselTypes";

export default function Dot({
  index,
  onScroll,
  viewContentIndex,
}: dotPropType) {
  return (
    <motion.li
      onClick={() => onScroll(index)}
      className="size-4 bg-white rounded-full"
      initial={{ width: 16, opacity: 0.5 }}
      animate={{
        width: viewContentIndex === index ? 32 : 16,
        opacity: viewContentIndex === index ? 1 : 0.5,
      }}
      whileHover={{
        boxShadow: "0 0 3px 2px rgba(255,255,255,0.8)",
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
    />
  );
}
