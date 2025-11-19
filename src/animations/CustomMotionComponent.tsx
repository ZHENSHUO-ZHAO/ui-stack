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

const outlineGradientAnimations: TargetAndTransition = {
  backgroundImage: [
    "conic-gradient(from 0deg, #f6339a00, #4f39f600, #4f39f600, #f6339a00)",
    "conic-gradient(from 360deg, #f6339a00, #4f39f6, #4f39f6, #f6339a00)",
    "conic-gradient(from 720deg, #f6339a, #4f39f6, #4f39f6, #f6339a)",
    "conic-gradient(from 1080deg, #f6339a, #4f39f6, #4f39f6, #f6339a)",
    "conic-gradient(from 1440deg, #f6339a, #4f39f600, #4f39f600, #f6339a)",
    "conic-gradient(from 1800deg, #f6339a00, #4f39f600, #4f39f600, #f6339a00)",
  ],
};

const textGradientAnimations: TargetAndTransition = {
  backgroundImage: [
    "linear-gradient(0deg, #f6339a00 0%, #4f39f600 100%)",
    "linear-gradient(360deg, #f6339a00 0%, #4f39f6 100%)",
    "linear-gradient(720deg, #f6339a 0%, #4f39f6 100%)",
    "linear-gradient(1080deg, #f6339a 0%, #4f39f6 100%)",
    "linear-gradient(1440deg, #f6339a 0%, #4f39f600 100%)",
    "linear-gradient(1800deg, #f6339a00 0%, #4f39f600 100%)",
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
