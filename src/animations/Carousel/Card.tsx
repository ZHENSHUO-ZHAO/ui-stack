import { motion, useTransform } from "motion/react";
import { useContext } from "react";
import type { cardPropType } from "./carouselTypes";
import { LayoutContext } from "./layoutContext";

// Card component use as a content holder in the Carousel.
export default function Card({ dragX, data }: cardPropType) {
  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) {
    throw new Error("LayoutContext cannot be undefined.");
  }

  const ratio = useTransform(() => {
    // The position offset from the card centered in the view.
    const offset = dragX.get() + data.offset;
    // Return percentage of how far the card is away from the view center, clamping between -1 and 1. The denominator can be adjusted to define the farthest point considered as 0.
    return Math.max(Math.min(offset / layoutContext.snapSize, 1), -1);
  });

  const opacity = useTransform(ratio, [-1, 0, 1], [0.2, 1, 0.2]);
  const rotateY = useTransform(ratio, [-1, 0, 1], [20, 0, -20]);
  const scale = useTransform(ratio, [-1, 0, 1], [0.7, 1, 0.7]);
  // Translate the inside div a bit closer to the center card.
  const translateX = useTransform(ratio, [-1, 0, 1], ["40%", "0%", "-40%"]);
  const zIndex = useTransform(ratio, [-1, 0, 1], [0, 1, 0]);

  return (
    <motion.li
      className="absolute top-0 left-0 "
      style={{
        width: `${layoutContext.cardWidth}px`,
        height: `${layoutContext.cardHeight}px`,
        zIndex,
      }}
    >
      <motion.div
        className="relative size-full bg-amber-500
                 flex justify-center items-center
                 rounded-2xl will-change-auto"
        style={{
          opacity,
          rotateY,
          scale,
          translateX,
        }}
        transformTemplate={(_, generatedTransform) =>
          `perspective(400px) ${generatedTransform}`
        }
      >
        <layoutContext.CardComponent
          content={layoutContext.contentList[data.index]}
        />
      </motion.div>
    </motion.li>
  );
}
