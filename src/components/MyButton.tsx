import { Button } from "@headlessui/react";
import React, { useState } from "react";

export default function MyButton({
  children,
}: {
  children: (isOpen: boolean) => React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        disabled
        onClick={() => setIsOpen((state) => !state)}
        className="bg-amber-200 text-2xl text-slate-400 px-2 py-1 rounded-2xl data-hover:bg-amber-400 data-disabled:bg-gray-800"
      >
        Toggle
      </Button>
      {children(isOpen)}
    </div>
  );
}
