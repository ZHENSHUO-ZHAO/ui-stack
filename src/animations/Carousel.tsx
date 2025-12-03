import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import MotionContainer from "./MotionContainer";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

type layoutDataType<T> = {
  cardWidth: number;
  cardHeight: number;
  baseX: number;
  snapSize: number;
  contentList: T[];
  CardComponent: React.ComponentType<cardItemType<T>>;
};

type cardHolderPropType = {
  initialIdex: number;
  ref: RefObject<Dispatch<SetStateAction<number>> | null>;
};

type cardDataType = {
  card: HTMLLIElement | null;
  offset: number;
  index: number;
};

export type cardItemType<T> = {
  content: T;
};

const cardCount = 5;
const LayoutContext = createContext<layoutDataType<unknown> | null>(null);

// Changed the core logic of the Carousel. The drag is applied on the holder that contains all the cards while cards are only teleported when needed. This avoids adding delta X to each card's translate X, which accumulates calculation discrepancies due to the notorious JS floating-point issue. Now the position of each is not set when teleported while the position calculations don't depend on delta accumulations.
export default function Carousel<T>({
  cardWidth,
  cardHeight,
  cardGap = 0,
  CardComponent,
  contentList,
}: {
  cardWidth: number;
  cardHeight?: number;
  cardGap?: number;
  CardComponent: React.ComponentType<cardItemType<T>>;
  contentList: T[];
}) {
  const layoutData: layoutDataType<T> = {
    cardWidth,
    cardHeight: cardHeight || cardWidth,
    baseX: -2 * (cardWidth + cardGap),
    snapSize: cardWidth + cardGap,
    contentList,
    CardComponent,
  };

  // The 'isDragging' flag is used to solve the 'onDrag' event being dispatched after the 'onDragEnd' event due to native pointer events queueing issues.
  const dragDataRef = useRef<{
    x: number;
    isDragging: boolean;
    scrollTimeout: number | null;
    boundaryL: number;
    boundaryR: number;
    viewL: number;
    viewR: number;
    midIndex: number;
    order: number[];
  }>({
    x: layoutData.baseX,
    isDragging: false,
    scrollTimeout: null,
    boundaryL: 0,
    boundaryR: cardCount * layoutData.snapSize,
    viewL: 0,
    viewR: cardCount * layoutData.snapSize,
    midIndex: Math.floor((cardCount - 1) / 2),
    order: Array.from({ length: cardCount }).map((_, i) => i), // order of the cardsRef array items
  });
  const inertiaRef = useRef<() => void | null>(null);
  // True physics-driven source of truth
  const dragX = useMotionValue(layoutData.baseX);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsHolderRef = useRef<HTMLUListElement>(null);
  const cardsRef = useRef<cardDataType[]>(
    (Array.from({ length: cardCount }) as HTMLDivElement[]).map((_, i) => {
      let index = i - dragDataRef.current.midIndex;
      if (index < 0) {
        index = index + contentList.length;
      }

      return {
        card: null,
        offset: i * layoutData.snapSize,
        index,
      };
    })
  );

  useEffect(() => {
    if (cardsHolderRef.current) {
      (Array.from(cardsHolderRef.current.children) as HTMLLIElement[]).forEach(
        (v, i) => {
          cardsRef.current[i].card = v;
          v.style.translate = `${i * layoutData.snapSize}px 0px`;
        }
      );
    }

    if (containerRef.current) {
      const el = containerRef.current;
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (e.deltaX != 0) {
          const dragData = dragDataRef.current;
          if (!dragData.isDragging) {
            onDragStart();
          }
          if (dragData.isDragging) {
            const newPos = dragData.x - e.deltaX;
            dragX.set(newPos);
            dragData.x = newPos;
            if (dragData.scrollTimeout) {
              clearTimeout(dragData.scrollTimeout);
            }
            dragData.scrollTimeout = setTimeout(() => {
              onDragEnd();
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
    }
  };

  const onDragEnd = () => {
    // Use inertia to create the slow down animation once the drag stops.
    dragDataRef.current.isDragging = false;
    const velocity = dragX.getVelocity();

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
    const springControls = animate(
      dragX,
      Math.round(dragX.get() / layoutData.snapSize) * layoutData.snapSize,
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

  useMotionValueEvent(dragX, "change", (latestValue: number) => {
    const data = dragDataRef.current;
    const cardsOrder = data.order;
    const cards = cardsRef.current;
    const offset = latestValue - (dragX.getPrevious() ?? layoutData.baseX);

    // Update the boundaries with the offset of the current drag. Use them to compare with the view to decide if teleports needed.
    data.boundaryL += offset;
    data.boundaryR += offset;

    // When dragging left, check if the right boundary is far enough to cover the rightmost of the view, and vice verser.
    if (
      (offset < 0 && data.boundaryR < data.viewR) ||
      (offset > 0 && data.boundaryL > data.viewL)
    ) {
      // Calculate the least number of card to be teleport to cover the view's corresponding empty space left by the drag.
      const offsetCount = Math.ceil(Math.abs(offset) / layoutData.snapSize);
      if (offsetCount > 0) {
        Array.from({ length: offsetCount }).forEach(() => {
          if (offset < 0) {
            // Dragging left, moving cards from the leftmost to the rightmost.

            // Calculate the new content index for the shifted card by adding 1 to the leftmost card's content index wrapping it within the content list item count.
            const newIndex =
              (cards[cardsOrder[cardsOrder.length - 1]].index + 1) %
              contentList.length;

            // Teleport the leftmost card to the rightmost.
            const shiftOrder = cardsOrder.shift() ?? 0;
            const shiftCard = cards[shiftOrder];
            if (shiftCard && shiftCard.card) {
              cardsOrder.push(shiftOrder);
              data.midIndex++;
              // Calculate the new translate X for the card being teleported.
              const offset = (data.midIndex + 2) * layoutData.snapSize;
              shiftCard.card.style.translate = `${offset}px 0px`;
              shiftCard.offset = offset;
              shiftCard.index = newIndex;
              // Update the boundaries to reflect the teleport.
              data.boundaryL += layoutData.snapSize;
              data.boundaryR += layoutData.snapSize;
            }
          } else {
            // Dragging right, moving cards from the rightmost to the leftmost.

            // Calculate the new content index for the shifted card by deducting 1 to the rightmost card's content index wrapping it within the content list item count.
            const newIndex =
              (cards[cardsOrder[0]].index - 1 + contentList.length) %
              contentList.length;

            // Teleport the rightmost card to the leftmost.
            const shiftOrder = cardsOrder.pop() ?? 0;
            const shiftCard = cards[shiftOrder];
            if (shiftCard && shiftCard.card) {
              cardsOrder.unshift(shiftOrder);
              data.midIndex--;
              // Calculate the new translate X for the card being teleported.
              const offset = (data.midIndex - 2) * layoutData.snapSize;
              shiftCard.card.style.translate = `${offset}px 0px`;
              shiftCard.offset = offset;
              shiftCard.index = newIndex;
              // Update the boundaries to reflect the teleport.
              data.boundaryL -= layoutData.snapSize;
              data.boundaryR -= layoutData.snapSize;
            }
          }
        });
      }
    }
  });

  return (
    <MotionContainer>
      <motion.div
        ref={containerRef}
        dragConstraints={{ left: 0, right: 0 }}
        drag="x"
        className="relative flex justify-center"
        dragMomentum={false}
        dragElastic={0}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{
          width: `${layoutData.cardWidth * 2}px`,
          height: `${layoutData.cardHeight}px`,
          maskImage: `linear-gradient(90deg, #0000, #000 10%, #000 90%, #0000)`,
        }}
      >
        <LayoutContext value={layoutData as layoutDataType<unknown>}>
          <motion.ul
            ref={cardsHolderRef}
            className="relative will-change-transform"
            style={{
              width: `${layoutData.cardWidth}px`,
              height: `${layoutData.cardHeight}px`,
              x: dragX,
            }}
          >
            {Array.from({ length: cardCount }).map((_, i) => (
              <Card key={i} dragX={dragX} data={cardsRef.current[i]} />
            ))}
          </motion.ul>
        </LayoutContext>
      </motion.div>
    </MotionContainer>
  );
}

function Card({
  dragX,
  data,
}: {
  dragX: MotionValue<number>;
  data: cardDataType;
}) {
  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) {
    throw new Error("LayoutContext cannot be undefined.");
  }

  const indexRef = useRef<number>(data.index);
  const setIndexRef =
    useRef<React.Dispatch<React.SetStateAction<number>>>(null);

  const ratio = useTransform(() => {
    if (indexRef.current !== data.index) {
      indexRef.current = data.index;
      setIndexRef.current?.(data.index);
    }

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
        <CardContentHolder initialIdex={indexRef.current} ref={setIndexRef} />
      </motion.div>
    </motion.li>
  );
}

function CardContentHolder({ initialIdex, ref }: cardHolderPropType) {
  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) {
    throw new Error("LayoutContext cannot be undefined.");
  }

  const [index, setIndex] = useState<number>(initialIdex);

  useEffect(() => {
    ref.current = setIndex;
  }, []);

  return (
    <>
      <layoutContext.CardComponent content={layoutContext.contentList[index]} />
    </>
  );
}
