import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import MotionContainer from "./MotionContainer";
import { useEffect, useRef } from "react";

const CARD_WIDTH = 100;
const CARD_GAP = 0;
const CARD_COUNT = 5;
const EDGE_RIGHT = 3 * (CARD_WIDTH + CARD_GAP);
const EDGE_LEFT = -2 * (CARD_WIDTH + CARD_GAP);
const BASE_X = -2 * (CARD_WIDTH + CARD_GAP);
const SNAP_SIZE = CARD_WIDTH + CARD_GAP;

export default function Carousel() {
  const cardsContent = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  // The 'isDragging' flag is used to solve the 'onDrag' event being dispatched after the 'onDragEnd' event due to native pointer events queueing issues.
  const dragDataRef = useRef<{
    x: number;
    isDragging: boolean;
    scrollTimeout: number | null;
  }>({
    x: BASE_X,
    isDragging: false,
    scrollTimeout: null,
  });
  const inertiaRef = useRef<() => void | null>(null);
  // True physics-driven source of truth
  const dragX = useMotionValue(BASE_X);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDragStart = () => {
    if (dragDataRef.current.scrollTimeout) {
      clearTimeout(dragDataRef.current.scrollTimeout);
      dragDataRef.current.scrollTimeout = null;
    }
    // Interrupt inertia animation if another drag is initiated before the inertia finishes.
    if (inertiaRef.current) {
      inertiaRef.current();
      // Update the start position of the drag for 'onDrag' calculations.
      dragDataRef.current.x = dragX.get();
      inertiaRef.current = null;
    }
    dragDataRef.current.isDragging = true;
  };

  const onDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (dragDataRef.current.isDragging) {
      dragX.set(info.offset.x + dragDataRef.current.x);
      console.log(info.offset.x);
    }
  };

  const onDragEnd = () => {
    // Use inertia to create the slow down animation once the drag stops.
    dragDataRef.current.isDragging = false;
    const velocity = dragX.getVelocity();
    // console.log(velocity);

    if (velocity !== 0) {
      const inertiaControls = animate(dragX, dragX.get() + velocity * 0.2, {
        type: "inertia",
        velocity,
        power: 0.8,
        timeConstant: 325,
        bounce: 0,
        restDelta: 3,
      });
      inertiaRef.current = inertiaControls.stop;
      inertiaControls.finished.then(startSnap).then(() => {
        dragDataRef.current.x = dragX.get();
      });
    } else {
      startSnap().then(() => {
        dragDataRef.current.x = dragX.get();
      });
    }
  };

  const startSnap = () => {
    console.log(
      "snap",
      Math.round(dragX.get() / SNAP_SIZE) * SNAP_SIZE,
      dragX.get()
    );
    const springControls = animate(
      dragX,
      Math.round(dragX.get() / SNAP_SIZE) * SNAP_SIZE,
      {
        type: "spring",
        stiffness: 700,
        damping: 40,
        mass: 0.5,
      }
    );
    inertiaRef.current = springControls.stop;
    return springControls.finished;
  };

  // const scrollAmountRef = useRef<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        // console.log(e.offsetX, e.deltaX);
        // console.log(scrollAmountRef.current, e.deltaX);
        // scrollAmountRef.current -= e.deltaX;
        // console.log(scrollAmountRef.current);
        if (e.deltaX != 0) {
          const dragData = dragDataRef.current;
          if (!dragData.isDragging) {
            onDragStart();
            // console.log("start scroll");
          }
          if (dragData.isDragging) {
            // console.log("on scroll");
            const newPos = dragData.x - e.deltaX;
            dragX.set(newPos);
            dragData.x = newPos;
            if (dragData.scrollTimeout) {
              clearTimeout(dragData.scrollTimeout);
            }
            dragData.scrollTimeout = setTimeout(() => {
              onDragEnd();
              // console.log("end scroll");
              dragData.scrollTimeout = null;
            }, 200);
          }
        }
      };
      // Add event listener to mouse scroll wheel.
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  return (
    <MotionContainer>
      <motion.div
        ref={containerRef}
        dragConstraints={{ left: 0, right: 0 }}
        drag="x"
        className={`relative h-[${CARD_WIDTH}px] w-[${
          CARD_WIDTH * 2
        }px] bg-sky-900 overflow-hidden flex justify-center`}
        dragMomentum={false}
        dragElastic={0}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        <div className={`relative size-[${CARD_WIDTH}px] perspective-[900px]`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} content={cardsContent} index={i} dragX={dragX} />
          ))}
        </div>
      </motion.div>
    </MotionContainer>
  );
}

function Card({
  content,
  index,
  dragX,
}: {
  content: string[];
  index: number;
  dragX: MotionValue<number>;
}) {
  const lastXRef = useRef<number>(
    index * (CARD_WIDTH + CARD_GAP) + dragX.get()
  );
  const indexRef = useRef<number>(index);
  const cardRef = useRef<HTMLDivElement>(null);

  const posX = useTransform(() => {
    const delta = dragX.get() - (dragX.getPrevious() ?? dragX.get());
    // if (index === 4) {
    //   console.log(lastXRef.current, dragX.get(), delta);
    // }
    let newPos = lastXRef.current + delta;
    let newIndex = indexRef.current;
    if (newPos < EDGE_LEFT && delta < 0) {
      // When dragging left, teleports leftmost items to the right.
      newPos = EDGE_RIGHT - (EDGE_LEFT - newPos);
      newIndex = (indexRef.current + CARD_COUNT) % content.length;
    } else if (newPos > EDGE_RIGHT && delta > 0) {
      // When dragging right, teleports leftmost items to the left.
      newPos = EDGE_LEFT + (newPos - EDGE_RIGHT);
      newIndex =
        (indexRef.current - CARD_COUNT + content.length) % content.length;
    }
    if (indexRef.current !== newIndex) {
      indexRef.current = newIndex;
      if (cardRef.current) {
        cardRef.current.innerText = content[indexRef.current];
      }
    }
    lastXRef.current = newPos;
    return newPos;
  });

  const opacity = useTransform(posX, [-SNAP_SIZE, 0, SNAP_SIZE], [0.7, 1, 0.7]);
  const rotateY = useTransform(posX, [-SNAP_SIZE, 0, SNAP_SIZE], [60, 0, -60]);
  const scale = useTransform(posX, [-SNAP_SIZE, 0, SNAP_SIZE], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      className={`absolute top-0 left-0 size-[${CARD_WIDTH}px] bg-amber-500
                 text-2xl font-black flex justify-center items-center
                 rounded-2xl will-change-transform`}
      style={{
        x: posX,
        opacity,
        rotateY,
        scaleX: scale,
        scaleY: scale,
      }}
    >
      {content[indexRef.current]}
    </motion.div>
  );
}
