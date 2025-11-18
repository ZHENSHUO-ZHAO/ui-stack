import { useLayoutEffect, useRef, useState } from "react";
import MotionContainer from "./MotionContainer";
import {
  AnimatePresence,
  clamp,
  motion,
  stagger,
  useMotionValue,
  type AnimationDefinition,
  type AnimationPlaybackControlsWithThen,
  type ValueAnimationTransition,
  type Variants,
} from "motion/react";
import { animate } from "motion";

const origins = [
  {
    text: "Columbia",
    bgColor: "from-amber-200",
    textColor: "data-selected:text-amber-400",
    menuOptions: ["Flavour Characteristics", "Stock", "New Bean Innovations"],
    optionColor: "hover:text-amber-200",
  },
  {
    text: "Ethiopia",
    bgColor: "from-teal-200",
    textColor: "data-selected:text-teal-400",
    menuOptions: ["Location", "Climate", "Culture"],
    optionColor: "hover:text-teal-200",
  },
  {
    text: "Peru",
    bgColor: "from-sky-200",
    textColor: "data-selected:text-sky-400",
    menuOptions: ["Climate", "Location", "Stock", "Flavour Characteristics"],
    optionColor: "hover:text-sky-200",
  },
  {
    text: "Basil",
    bgColor: "from-lime-200",
    textColor: "data-selected:text-lime-400",
    menuOptions: ["New Bean Innovations", "Flavour Characteristics", "Stock"],
    optionColor: "hover:text-lime-200",
  },
  {
    text: "Kenya",
    bgColor: "from-pink-200",
    textColor: "data-selected:text-pink-400",
    menuOptions: [
      "Location",
      "Climate",
      "Culture",
      "Flavour Characteristics",
      "Stock",
      "New Bean Innovations",
    ],
    optionColor: "hover:text-pink-200",
  },
];

export default function AnimatedTabs() {
  const [index, setIndex] = useState(-1);
  const targetIndex = useRef(0);
  const toggle = useRef(false);
  const hasToggleChanged = useRef(false);
  const tabPosX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const transition: ValueAnimationTransition<number> = {
    ease: "easeIn",
    duration: 0.2,
  };

  const [underlineAnimation, setUnderlineAnimation] = useState("initial");
  const [buttonAnimation, setButtonAnimation] = useState("initial");

  const buttonVariants: Variants = {
    initial: { y: -10, opacity: 0, transition: { duration: 0 } },
    in: { y: 0, opacity: 1, transition: transition },
    open: { y: 0, opacity: 1, transition: transition },
    out: { y: -10, opacity: 0, transition: transition },
    close: { y: -10, opacity: 0, transition: transition },
  };
  const buttonGroupVariant: Variants = {
    initial: { opacity: 0, transition: { duration: 0 } },
    open: {
      opacity: 1,
      transition: {
        ...transition,
        when: "beforeChildren",
        delayChildren: stagger(0.05),
      },
    },
    close: {
      opacity: 0,
      transition: {
        ...transition,
        when: "afterChildren",
        delayChildren: stagger(0.05),
      },
    },
    in: {
      transition: {
        delayChildren: stagger(0.05),
      },
    },
    out: {
      transition: {
        delayChildren: stagger(0.05),
      },
    },
  };

  const underlineVariants: Variants = {
    initial: { opacity: 0, transition: { duration: 0 } },
    open: {
      opacity: 1,
      transition: transition,
    },
    close: (count) => ({
      opacity: 0,
      transition: { ...transition, delay: 0.05 * (count - 1) + 0.2 },
    }),
  };

  const onTab = (tabIndex: number) => {
    if (tabIndex === index || !toggle.current) {
      if (toggle.current) {
        setUnderlineAnimation("close");
        setButtonAnimation("close");
      } else {
        setUnderlineAnimation("open");
        setButtonAnimation("open");
        setIndex(tabIndex);
      }
      toggle.current = !toggle.current;
      hasToggleChanged.current = true;
    } else {
      setButtonAnimation("out");
      targetIndex.current = tabIndex;
    }
  };

  const onButtonAnimationComplete = (definition: AnimationDefinition) => {
    if (definition === "out") {
      setIndex(targetIndex.current);
    } else if (definition === "close") {
      setIndex(-1);
    }
  };

  useLayoutEffect(() => {
    let layoutAnimation: AnimationPlaybackControlsWithThen;

    if (containerRef.current && menuRef.current && index >= 0) {
      const container = containerRef.current;
      const menu = menuRef.current;
      const tabWidth = container.clientWidth / origins.length;
      const menuWidth = menu.clientWidth;
      const offset = menuWidth > tabWidth ? (menuWidth - tabWidth) / 2 : 0;
      const newPosX = clamp(
        0,
        container.clientWidth - menuWidth,
        tabWidth * index - offset
      );
      if (toggle.current) {
        if (!hasToggleChanged.current) {
          layoutAnimation = animate(tabPosX, newPosX, transition);
          layoutAnimation.then(() => {
            setButtonAnimation("in");
          });
        } else {
          tabPosX.set(newPosX);
          hasToggleChanged.current = false;
        }
      }
    }
    return () => {
      if (layoutAnimation) {
        layoutAnimation.stop();
      }
    };
  }, [index]);

  return (
    <MotionContainer>
      <div
        ref={containerRef}
        className="self-start flex flex-col items-center w-1/3"
      >
        <div className="w-full flex justify-between items-start">
          {origins.map((o, i) => (
            <div
              key={i}
              onClick={() => {
                onTab(i);
              }}
              className="flex-1"
            >
              <div
                data-selected={index === i ? true : undefined}
                className={`text-center text-lg font-semibold rounded-tl-lg rounded-tr-lg text-slate-400 hover:bg-slate-700 ${o.textColor} transition duration-500`}
              >
                {o.text}
              </div>
              <AnimatePresence>
                {index === i && (
                  <motion.div
                    layoutId="underline"
                    transition={{
                      ...transition,
                      duration: hasToggleChanged.current ? 0 : 0.2,
                    }}
                    animate={underlineAnimation}
                    variants={underlineVariants}
                    custom={o.menuOptions.length}
                    className={`h-4 w-full bg-linear-to-b ${o.bgColor} from-0% to-slate-500 to-100%`}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <motion.div
          ref={menuRef}
          layoutId="menu"
          style={{ x: tabPosX }}
          transition={{
            ...transition,
            duration: hasToggleChanged.current ? 0 : 0.2,
          }}
          variants={buttonGroupVariant}
          animate={buttonAnimation}
          onAnimationComplete={onButtonAnimationComplete}
          className="min-w-1/5 max-w-full flex flex-col bg-slate-500 rounded-lg rounded-t-none py-2 px-4 self-start"
        >
          {index >= 0 &&
            origins[index].menuOptions.map((o, i) => (
              <motion.button
                key={`${index}-${i}`}
                style={{ opacity: 0, y: -10 }}
                variants={buttonVariants}
                className={`text-lg ${origins[index].optionColor}`}
              >
                {o}
              </motion.button>
            ))}
        </motion.div>
      </div>
    </MotionContainer>
  );
}
