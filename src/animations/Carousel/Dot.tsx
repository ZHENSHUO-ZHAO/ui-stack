import { motion } from "motion/react";
import type { dotPropType } from "./carouselTypes";

export default function Dot({
  index,
  onScroll,
  viewContentIndex,
}: dotPropType) {
  // Width is responsive to its parent.
  return (
    <motion.li
      onClick={() => onScroll(index)}
      className="bg-white rounded-full min-h-3 max-h-5 max-w-10"
      initial={{ width: "4%", opacity: 0.5 }}
      animate={{
        width: viewContentIndex === index ? "16%" : "2%",
        opacity: viewContentIndex === index ? 1 : 0.5,
      }}
      whileHover={{
        boxShadow: "0 0 3px 2px rgba(255,255,255,0.8)",
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9, boxShadow: "0 0 3px 2px rgba(255,255,255,0.8)" }}
    />
  );
}
