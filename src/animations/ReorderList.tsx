import { Reorder, type Variants } from "motion/react";
import MotionContainer from "./MotionContainer";
import { useState } from "react";

export default function ReorderList() {
  const [items, setItems] = useState([0, 1, 2, 3, 4, 5]);

  return (
    <MotionContainer>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="bg-slate-200 rounded-xs flex flex-col gap-2 p-5"
      >
        {items.map((item) => (
          <ListItem key={item} item={item} />
          //   <Reorder.Item
          //     key={item}
          //     value={item}
          //     className="bg-amber-500 rounded-lg text-white text-lg px-2 py-1"
          //     // initial={{ scale: 1 }}
          //     // animate={{
          //     //   scale: 1,
          //     //   boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          //     //   cursor: "default",
          //     // }}
          //     whileDrag={{
          //       scale: 1.2,
          //       boxShadow: "2px 2px 5px rgb(20 20 20 / 0.7)",
          //       cursor: "grabbing",
          //     }}
          //   >
          //     {`item - ${item}`}
          //   </Reorder.Item>
        ))}
      </Reorder.Group>
    </MotionContainer>
  );
}

const dragVariants: Variants = {
  start: {
    scale: 1.2,
    boxShadow: "2px 2px 5px rgb(20 20 20 / 0.7)",
    cursor: "grabbing",
  },
  end: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    cursor: "default",
  },
};

const ListItem = ({ item }: { item: number }) => {
  const [dragVariant, setDragVariant] = useState("");
  return (
    <Reorder.Item
      key={item}
      value={item}
      className="bg-amber-500 rounded-lg text-white text-lg px-2 py-1"
      variants={dragVariants}
      animate={dragVariant}
      onDragStart={() => setDragVariant("start")}
      onDragEnd={() => setDragVariant("end")}
    >
      {`item - ${item}`}
    </Reorder.Item>
  );
};
