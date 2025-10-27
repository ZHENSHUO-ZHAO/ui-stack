import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";

export default function PopoverTabs() {
  const tabs: {
    buttonText: string;
    itemTexts: string[];
  }[] = [
    {
      buttonText: "Solution",
      itemTexts: ["Analytics", "Machine Learning", "CI/CD", "Pipelines"],
    },
    {
      buttonText: "Industry",
      itemTexts: ["iGaming", "Government", "Medical", "Hospital", "Mining"],
    },
    {
      buttonText: "Available Regions",
      itemTexts: ["Australia", "United Kingdom", "Hong Kong"],
    },
  ];

  return (
    <PopoverGroup className="flex divide-x divide-slate-500">
      {tabs.map((tab, i) => (
        <Tab {...tab} key={i}></Tab>
      ))}
    </PopoverGroup>
  );
}

function Tab({
  buttonText,
  itemTexts,
}: {
  buttonText: string;
  itemTexts: string[];
}) {
  return (
    <Popover className="flex-[1_1_0]">
      <PopoverButton className="outline-none py-4 text-2xl font-bold text-center w-full bg-slate-700 hover:bg-sky-400 data-active:bg-sky-600">
        {buttonText}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="w-(--button-width) origin-top flex flex-col bg-slate-700 rounded-b-lg divide-y divide-slate-600 transition duration-300 ease-out data-closed:scale-y-90 data-closed:opacity-0"
      >
        {itemTexts.map((text, i) => (
          <button
            key={i}
            className="text-left text-lg px-8 last:rounded-b-lg p-4 hover:bg-slate-400 hover:cursor-pointer"
          >
            {text}
          </button>
        ))}
      </PopoverPanel>
    </Popover>
  );
}
