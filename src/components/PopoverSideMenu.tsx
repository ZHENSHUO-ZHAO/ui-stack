import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid";

export default function PopoverSideMenu() {
  return (
    <Popover>
      <PopoverButton className="text-2xl font-bold">Menu</PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-gray-800/50 duration-300 ease-out data-closed:opacity-0"
      />
      <PopoverPanel
        transition
        className="fixed inset-y-0 right-0 flex flex-col bg-slate-700 rounded-r-lg divide-y divide-slate-600 transition duration-300 ease-out data-closed:translate-x-full"
      >
        <PopoverButton className="flex justify-end items-center text-lg first:rounded-tr-lg p-4 hover:bg-slate-400 hover:cursor-pointer">
          &nbsp;
          <ArrowLongLeftIcon className="size-5" />
        </PopoverButton>
        <button className="text-left text-lg first:rounded-tr-lg p-4 hover:bg-slate-400 hover:cursor-pointer">
          Home
        </button>
        <button className="text-left text-lg first:rounded-tr-lg p-4 hover:bg-slate-400 hover:cursor-pointer">
          Academic Background
        </button>
        <button className="text-left text-lg first:rounded-tr-lg p-4 hover:bg-slate-400 hover:cursor-pointer">
          Work Experience
        </button>
        <button className="text-left text-lg first:rounded-tr-lg p-4 hover:bg-slate-400 hover:cursor-pointer">
          Side Projects
        </button>
        <button className="text-left text-lg first:rounded-tr-lg p-4 hover:bg-slate-400 hover:cursor-pointer">
          About Me
        </button>
      </PopoverPanel>
    </Popover>
  );
}
