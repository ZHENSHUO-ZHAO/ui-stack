import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Description,
  Field,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

type stopType = { id: number; name: string; available: boolean };

const destinations: stopType[] = [
  { id: 1, name: "Melbourne", available: true },
  { id: 2, name: "Sydney", available: true },
  { id: 3, name: "Adelaide", available: true },
  { id: 4, name: "Darwin", available: false },
  { id: 5, name: "Tasmania", available: true },
];

export default function MyComboBox() {
  const [stop, setStop] = useState<stopType | null>(destinations[0]);
  const [query, setQuery] = useState("");

  const filteredStops =
    query === ""
      ? destinations
      : destinations.filter((d) =>
          d.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(
      `Form Data: ${JSON.stringify(Object.fromEntries(formData.entries()))}`
    );
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <Field>
        <Label className="block text-sky-500 text-lg font-semibold mt-1">
          Choose your destination:
        </Label>
        <Description className="block text-slate-400 mb-2">
          The destinations are bounded within Australia.
        </Description>
        <Combobox
          immediate
          virtual={{ options: filteredStops, disabled: (s) => !s?.available }}
          name="destination"
          value={stop}
          onChange={setStop}
          onClose={() => setQuery("")}
        >
          <div className="relative w-fit">
            <ComboboxInput
              displayValue={(s: stopType | null) => (s ? s.name : "")}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-slate-600 text-slate-100 rounded-t-sm text-lg px-2"
            />
            <ComboboxButton className="group absolute top-1 right-2">
              <ChevronDownIcon className="fill-slate-300 size-5 group-data-hover:fill-slate-50" />
            </ComboboxButton>
          </div>
          <ComboboxOptions
            anchor="bottom"
            transition
            className="origin-top h-30 empty:invisible bg-sky-700/50 backdrop-blur-sm w-(--input-width) [--anchor-gap:--spacing(1)] rounded-b-sm transition duration-300 ease-in-out data-closed:scale-y-90 data-closed:opacity-0"
          >
            {({ option: s }) => (
              <ComboboxOption
                key={s.id}
                value={s}
                // disabled={!s.available}
                className="group flex gap-2 justify-start items-center my-2 text-lg text-slate-50 data-focus:text-sky-400 data-disabled:text-gray-400 data-disabled:line-through"
              >
                <CheckIcon className="invisible size-6 fill-slate-50 group-data-selected:visible group-data-focus:fill-sky-400" />
                {s.name}
              </ComboboxOption>
            )}
          </ComboboxOptions>
        </Combobox>
      </Field>
      <button type="submit">Submit Destination</button>
    </form>
  );
}
