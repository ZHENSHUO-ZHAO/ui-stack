import {
  CloseButton,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  useClose,
} from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

export default function DisclosureUI() {
  return (
    <div className="flex flex-col bg-slate-600 w-xs rounded-lg divide-y divide-slate-500">
      <Disclosure as="div" className="group" defaultOpen={true}>
        <DisclosureButton className="text-xl p-4 flex items-center w-full justify-between">
          <span className="group-hover:text-sky-300">Shipment</span>
          <ChevronDownIcon className="size-6 group-data-open:hidden group-hover:text-sky-300" />
          <ChevronUpIcon className="size-6 not-group-data-open:hidden group-hover:text-sky-300" />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-closed:-translate-y-4 data-closed:opacity-0"
        >
          {({ close }) => (
            <div
              className="p-4 pt-0 -mt-3 text-slate-400"
              onClick={() => close()}
            >
              Shipment is offered through Australian Post or DHL.
            </div>
          )}
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="div" className="group">
        <DisclosureButton className="text-xl p-4 flex items-center w-full justify-between">
          <span className="group-hover:text-sky-300">Cost</span>
          <ChevronDownIcon className="size-6 group-data-open:hidden group-hover:text-sky-300" />
          <ChevronUpIcon className="size-6 not-group-data-open:hidden group-hover:text-sky-300" />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-closed:-translate-y-4 data-closed:opacity-0"
        >
          {({ close }) => (
            <div
              className="p-4 pt-0 -mt-3 text-slate-400"
              onClick={() => close()}
            >
              Shipment is offered through Australian Post or DHL.
            </div>
          )}
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="div" className="group">
        <DisclosureButton className="text-xl p-4 flex items-center w-full justify-between">
          <span className="group-hover:text-sky-300">Refund</span>
          <ChevronDownIcon className="size-6 group-data-open:hidden group-hover:text-sky-300" />
          <ChevronUpIcon className="size-6 not-group-data-open:hidden group-hover:text-sky-300" />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className="origin-top transition duration-200 ease-out data-closed:-translate-y-4 data-closed:opacity-0"
        >
          <CloseButton as="div" className="p-4 pt-0 -mt-3 text-slate-400">
            All shipments are not refundable.
          </CloseButton>
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="div" className="group">
        <DisclosureButton className="text-xl p-4 flex items-center w-full justify-between">
          <span className="group-hover:text-sky-300">Search</span>
          <ChevronDownIcon className="size-6 group-data-open:hidden group-hover:text-sky-300" />
          <ChevronUpIcon className="size-6 not-group-data-open:hidden group-hover:text-sky-300" />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className="p-4 pt-0 -mt-3 origin-top transition duration-200 ease-out data-closed:-translate-y-4 data-closed:opacity-0"
        >
          <SearchForm />
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}

function SearchForm() {
  const close = useClose();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        close();
      }}
      className="flex gap-2 w-full items-start"
    >
      <input
        type="text"
        className="bg-slate-300 text-gray-800 rounded-sm px-1 outline-none focus:ring-2 focus:ring-sky-400"
      />
      <button
        type="submit"
        className="bg-sky-700 text-slate-100 rounded-sm px-2 hover:bg-sky-500"
      >
        Search
      </button>
    </form>
  );
}
