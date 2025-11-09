import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const cities: string[] = [
  "Melbourne",
  "Sydney",
  "Tasmania",
  "Darwin",
  "Gold Coast",
  "Perth",
  "Brisbane",
];

export default function MyListbox() {
  const [city, setCity] = useState();

  return (
    <Listbox value={city} onChange={setCity}>
      <ListboxButton className="group flex justify-between items-center bg-slate-700 text-xl text-slate-50 rounded-md px-2 py-1 min-w-40 text-left data-hover:text-teal-300">
        {city || "Select a city..."}
        <ChevronDownIcon className="size-5 fill-slate-200 group-data-hover:fill-teal-300" />
      </ListboxButton>
      <ListboxOptions
        transition
        anchor="bottom"
        className="origin-top bg-slate-500/70 backdrop-blur-xs text-slate-100 rounded-md [--anchor-gap:--spacing(1)] w-(--button-width) transition duration-300 ease-in-out data-closed:scale-y-95 data-closed:opacity-0"
      >
        {cities.map((city, i) => (
          <ListboxOption
            key={i}
            value={city}
            className="group grid grid-cols-1 data-focus:cursor-pointer"
          >
            <div className="row-start-1 col-start-1 border-l-4 border-l-sky-400 bg-linear-to-r/oklch from-sky-300/30 to-teal-300/30 opacity-0 origin-left scale-x-0 transition duration-300 ease-in-out group-data-focus:opacity-100 group-data-focus:scale-100"></div>
            <div className="row-start-1 col-start-1 px-2 py-1 flex justify-between items-center text-shadow-slate-600 transition duration-300 ease-in-out group-data-focus:text-teal-200 group-data-focus:text-shadow-md">
              {city}
              <CheckIcon className="size-4 fill-slate-100 invisible transition duration-300 ease-in-out  group-data-selected:visible group-data-focus:fill-teal-200" />
            </div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
