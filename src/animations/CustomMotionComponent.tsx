import {
  motion,
  type MotionProps,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import MotionContainer from "./MotionContainer";

type MyComponentProps = MotionProps &
  React.ComponentPropsWithoutRef<"div"> & {
    ref: React.Ref<HTMLDivElement>;
  };

const MyMotionComponent = motion.create(MyComponent, {
  forwardMotionProps: true,
});

export default function CustomMotionComponent() {
  return (
    <MotionContainer>
      <MyMotionComponent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </MotionContainer>
  );
}

const colors = {
  pink0: "#f6339a00",
  pink1: "#f6339a",
  purple0: "#4f39f600",
  purple1: "#4f39f6",
};

const createConicGradient = (degree: number, ...colors: string[]) => {
  return `conic-gradient(from ${degree}deg, ${colors.join(", ")})`;
};

const createLinearGradient = (
  degree: number,
  startColor: string,
  endColor: string
) => {
  return `linear-gradient(${degree}deg, ${startColor} 0%, ${endColor} 100%)`;
};

const outlineGradientAnimations: TargetAndTransition = {
  backgroundImage: [
    createConicGradient(
      0,
      colors.pink0,
      colors.purple0,
      colors.purple0,
      colors.pink0
    ),
    createConicGradient(
      360,
      colors.pink0,
      colors.purple1,
      colors.purple1,
      colors.pink0
    ),
    createConicGradient(
      720,
      colors.pink1,
      colors.purple1,
      colors.purple1,
      colors.pink1
    ),
    createConicGradient(
      1080,
      colors.pink1,
      colors.purple1,
      colors.purple1,
      colors.pink1
    ),
    createConicGradient(
      1440,
      colors.pink1,
      colors.purple0,
      colors.purple0,
      colors.pink1
    ),
    createConicGradient(
      1800,
      colors.pink0,
      colors.purple0,
      colors.purple0,
      colors.pink0
    ),
  ],
};

const textGradientAnimations: TargetAndTransition = {
  backgroundImage: [
    createLinearGradient(0, colors.pink0, colors.purple0),
    createLinearGradient(360, colors.pink0, colors.purple1),
    createLinearGradient(720, colors.pink1, colors.purple1),
    createLinearGradient(1080, colors.pink1, colors.purple1),
    createLinearGradient(1440, colors.pink0, colors.purple1),
    createLinearGradient(1800, colors.pink0, colors.purple0),
  ],
};

const gradientTransition: Transition<string> = {
  ease: "linear",
  duration: 10,
  repeat: Infinity,
  times: [0.15, 0.3, 0.7, 0.85, 1],
};

function MyComponent(props: MyComponentProps) {
  // console.log(props.transition);
  return (
    <div className="relative" ref={props.ref}>
      <Outline blur="blur-xs" inset="-inset-1" z="z-10" />
      <Outline inset="-inset-0.5" z="z-15" />
      <div className="absolute inset-0 z-17 bg-slate-800 text-xl font-extrabold rounded-full" />
      <motion.div
        animate={textGradientAnimations}
        transition={gradientTransition}
        className="relative z-20 bg-slate-800 text-xl font-extrabold rounded-full pt-2 pb-3 pr-4 pl-6 bg-clip-text text-white/20"
      >
        Nintendo <span className="text-base align-super">&reg;</span>
      </motion.div>
    </div>
  );
}

function Outline({
  blur,
  z,
  inset,
}: {
  blur?: string;
  z: string;
  inset: string;
}) {
  return (
    <motion.div
      className={`absolute ${inset} rounded-full ${blur || ""} ${z}`}
      animate={outlineGradientAnimations}
      transition={gradientTransition}
    ></motion.div>
  );
}
