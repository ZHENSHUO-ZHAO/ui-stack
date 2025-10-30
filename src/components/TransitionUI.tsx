import { Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

// Notes:
// When the open transition is triggered, the enter, closed data added to the transition object alongside the animation. The state in enter and closed are set as the object's initial state, as the animation is created with these data at the same time when the object is created.
// The closed data is removed at the beginning of the open animation and the enter data is removed at the end of the open animation.
// When the close transition is triggered, the leave data is added while the closed data is added in the next frame.
// The leave data is removed when the animation is done.

export default function TransitionUI() {
  const [open, setOpen] = useState(false);
  // const divRef = useRef<HTMLDivElement>(null);
  // const hasRef = useRef<boolean>(false);
  // const startTime = useRef<DOMHighResTimeStamp>(null);
  // const endTime = useRef<DOMHighResTimeStamp>(null);
  // const isClosing = useRef<boolean>(false);

  // const toggle = () => {
  //   console.log("Open");
  //   setOpen((state) => {
  //     if (state) isClosing.current = true;
  //     else isClosing.current = false;
  //     return !state;
  //   });
  // };

  // useEffect(() => {
  //   const observe = (ts: DOMHighResTimeStamp) => {
  //     if (!isClosing.current && divRef.current) {
  //       if (!startTime.current && divRef.current.hasAttribute("data-enter")) {
  //         startTime.current = ts;
  //       }
  //       if (!endTime.current && divRef.current.hasAttribute("data-closed")) {
  //         endTime.current = ts;
  //       }
  //       if (startTime.current && endTime.current) {
  //         console.log(`Time gap ${endTime.current - startTime.current}ms`);
  //       } else {
  //         requestAnimationFrame(observe);
  //       }
  //     } else {
  //       requestAnimationFrame(observe);
  //     }
  //   };
  //   requestAnimationFrame(observe);
  // }, []);

  return (
    <>
      <button
        // onClick={toggle}
        onClick={() => setOpen((state) => !state)}
        className="text-lg text-white bg-lime-600 rounded-full px-2 py-1 hover:bg-lime-500"
      >
        Toggle
      </button>
      <Transition show={open}>
        <div
          // ref={divRef}
          className="w-1/3 mx-auto my-1 h-10 text-center bg-amber-600 text-white text-lg rounded-2xl transition  data-closed:opacity-0 data-enter:duration-500 data-enter:ease-in data-enter:data-closed:scale-40 data-leave:duration-300 data-leave:ease-out data-leave:data-closed:scale-200"
        >
          Toggle content
        </div>
      </Transition>
    </>
  );
}
