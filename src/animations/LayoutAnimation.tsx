import {
  AnimatePresence,
  LayoutGroup,
  motion,
  MotionConfig,
} from "motion/react";
import MotionContainer from "./MotionContainer";
import { useState } from "react";

const items: { name: string }[] = [
  { name: "Latte" },
  { name: "Mocha" },
  { name: "Cappuccino" },
  { name: "Piccolo" },
];

export default function LayoutAnimation() {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <MotionContainer>
      <MotionConfig transition={{ ease: "linear", duration: 0.2 }}>
        <LayoutGroup>
          <motion.ul layout className="flex flex-col gap-1">
            {items.map((item) => (
              <motion.li
                layout
                key={item.name}
                className="bg-amber-300 px-2 py-1 rounded-lg text-slate-700"
                onClick={() => setSelectedItem(item.name)}
                transition={{ ease: "linear" }}
              >
                {item.name}
                <AnimatePresence>
                  {item.name === selectedItem && (
                    <motion.div
                      key={item.name}
                      layoutId="underline"
                      className="w-full h-1 bg-sky-500"
                    />
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>
        </LayoutGroup>
      </MotionConfig>
    </MotionContainer>
  );
}
