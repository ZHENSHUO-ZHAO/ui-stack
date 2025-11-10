import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function MySwitch() {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group rounded-full h-8 w-15 bg-white/10 inline-flex justify-start items-center transition duration-300 ease-in-out data-hover:bg-white/30"
    >
      <span className="inline-block size-6 rounded-full bg-gray-300 translate-x-1 opacity-80 transition duration-300 ease-in-out group-data-hover:opacity-100 group-data-checked:bg-teal-300 group-data-checked:translate-x-8" />
    </Switch>
  );
}
