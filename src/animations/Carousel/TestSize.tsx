import MotionContainer from "../MotionContainer";
import useMeasure from "./measureHook";

export default function TestSize() {
  const [ref, size] = useMeasure<HTMLDivElement>();

  return (
    <MotionContainer>
      <div
        ref={ref}
        className="min-w-[400px] max-w-[800px] bg-yellow-600 text-center text-2xl font-bold"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        facere fugiat minus repellat excepturi labore pariatur enim cum,
        asperiores aliquid accusamus eligendi fugit voluptatem dolorem nobis
        beatae sint neque temporibus!
      </div>
    </MotionContainer>
  );
}
