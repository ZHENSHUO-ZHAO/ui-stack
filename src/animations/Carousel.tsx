import {
  animate,
  motion,
  useMotionValue,
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
  cardGap: number;
  edgeR: number;
  edgeL: number;
  baseX: number;
  snapSize: number;
  contentList: T[];
  CardComponent: React.ComponentType<cardItemType<T>>;
};

type cardHolderType = {
  initialIdex: number;
  ref: RefObject<Dispatch<SetStateAction<number>> | null>;
};

export type cardItemType<T> = {
  content: T;
};

const cardCount = 5;
const LayoutContext = createContext<layoutDataType<unknown> | null>(null);

export default function Carousel<T>({
  cardWidth,
  cardGap = 0,
  CardComponent,
  contentList,
}: {
  cardWidth: number;
  cardGap?: number;
  CardComponent: React.ComponentType<cardItemType<T>>;
  contentList: T[];
}) {
  const layoutData: layoutDataType<T> = {
    cardWidth,
    cardGap,
    edgeR: 3 * (cardWidth + cardGap),
    edgeL: -2 * (cardWidth + cardGap),
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
  }>({
    x: layoutData.baseX,
    isDragging: false,
    scrollTimeout: null,
  });
  const inertiaRef = useRef<() => void | null>(null);
  // True physics-driven source of truth
  const dragX = useMotionValue(layoutData.baseX);
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
        console.log(`snap done dragX ${dragX.get()}`);
        dragDataRef.current.x = dragX.get();
      });
    } else {
      startSnap().then(() => {
        console.log(`snap done dragX ${dragX.get()}`);
        dragDataRef.current.x = dragX.get();
      });
    }
  };

  const startSnap = () => {
    console.log(
      "snap",
      Math.round(dragX.get() / layoutData.snapSize) * layoutData.snapSize,
      dragX.get()
    );
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

  useEffect(() => {
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

  return (
    <MotionContainer>
      <motion.div
        ref={containerRef}
        dragConstraints={{ left: 0, right: 0 }}
        drag="x"
        className="relative overflow-hidden flex justify-center"
        dragMomentum={false}
        dragElastic={0}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{
          width: `${cardWidth * 2}px`,
          height: `${cardWidth}px`,
          maskImage: `linear-gradient(90deg, #0000, #000 10%, #000 90%, #0000)`,
        }}
      >
        <LayoutContext value={layoutData as layoutDataType<unknown>}>
          <div
            className="relative perspective-[900px]"
            style={{ width: `${cardWidth}px`, height: `${cardWidth}px` }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} index={i} dragX={dragX} />
            ))}
          </div>
        </LayoutContext>
      </motion.div>
    </MotionContainer>
  );
}

function Card({ index, dragX }: { index: number; dragX: MotionValue<number> }) {
  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) {
    throw new Error("Card must be used inside <Carousel>");
  }
  const lastXRef = useRef<number>(
    index * (layoutContext.cardWidth + layoutContext.cardGap) + dragX.get()
  );

  const indexRef = useRef<number>(index);
  const cardRef = useRef<HTMLDivElement>(null);
  const setIndexRef =
    useRef<React.Dispatch<React.SetStateAction<number>>>(null);

  const posX = useTransform(() => {
    const delta = dragX.get() - (dragX.getPrevious() ?? dragX.get());
    let newPos = lastXRef.current + delta;
    console.log(
      `index ${index}, dragX ${dragX.get()}, delta ${delta}, newPos ${newPos}`
    );
    let newIndex = indexRef.current;
    if (newPos < layoutContext.edgeL && delta < 0) {
      // When dragging left, teleports leftmost items to the right.
      newPos = layoutContext.edgeR - (layoutContext.edgeL - newPos);
      newIndex =
        (indexRef.current + cardCount) % layoutContext.contentList.length;
    } else if (newPos > layoutContext.edgeR && delta > 0) {
      // When dragging right, teleports leftmost items to the left.
      newPos = layoutContext.edgeL + (newPos - layoutContext.edgeR);
      newIndex =
        (indexRef.current - cardCount + layoutContext.contentList.length) %
        layoutContext.contentList.length;
    }
    if (indexRef.current !== newIndex) {
      setIndexRef.current?.(newIndex);
      indexRef.current = newIndex;
    }
    lastXRef.current = newPos;
    if (index === 2) {
      // console.log(`transform pos ${newPos}, dragX ${dragX.get()}`);
    }
    return newPos;
  });

  const opacity = useTransform(
    posX,
    [-layoutContext.snapSize, 0, layoutContext.snapSize],
    [0.2, 1, 0.2]
  );
  const rotateY = useTransform(
    posX,
    [-layoutContext.snapSize, 0, layoutContext.snapSize],
    [60, 0, -60]
  );
  const scale = useTransform(
    posX,
    [-layoutContext.snapSize, 0, layoutContext.snapSize],
    [0.8, 1, 0.8]
  );

  return (
    <motion.div
      ref={cardRef}
      className="absolute top-0 left-0 bg-amber-500
                 text-2xl font-black flex justify-center items-center
                 rounded-2xl will-change-transform"
      style={{
        width: `${layoutContext.cardWidth}px`,
        height: `${layoutContext.cardWidth}px`,
        x: posX,
        opacity,
        rotateY,
        scaleX: scale,
        scaleY: scale,
      }}
    >
      <CardContentHolder initialIdex={index} ref={setIndexRef} />
    </motion.div>
  );
}

function CardContentHolder({ initialIdex, ref }: cardHolderType) {
  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) {
    throw new Error("Card must be used inside <Carousel>");
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
