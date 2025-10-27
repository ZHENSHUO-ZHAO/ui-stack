import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";

export default function TabsUI() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const data: { title: string; options: string[] }[] = [
    { title: "Category", options: ["Clothes", "Electronics", "Grocery"] },
    {
      title: "Region",
      options: [
        "Australia",
        "United Kingdom",
        "Hong Kong",
        "New Zealand",
        "Fiji",
      ],
    },
    {
      title: "Shipment",
      options: [
        "Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post Australian Post ",
        "DHL",
        "EMS",
      ],
    },
  ];

  return (
    <div className="w-full flex justify-center py-4">
      <TabGroup
        className="space-y-4 w-1/3"
        defaultIndex={0}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <TabList className="space-x-4">
          {data.map((d, i) => (
            <Tab
              key={i}
              className="bg-gray-600/0 rounded-full px-6 py-1.5 text-lg data-hover:bg-gray-700 data-selected:bg-gray-800"
            >
              {d.title}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="bg-slate-700/60 rounded-2xl p-4 w-fit">
          {data.map((d, i) => (
            <TabPanel key={i} className="flex flex-col text-lg">
              {d.options.map((o, j) => (
                <button
                  key={j}
                  className="px-2 py-1 text-left rounded-lg transition duration-500 ease-out hover:bg-slate-400/50"
                >
                  {o}
                </button>
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
