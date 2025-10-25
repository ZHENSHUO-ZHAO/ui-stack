import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator,
} from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";

export default function DropdownMenu() {
  const signOut = () => alert("Signed Out!");

  return (
    <Menu>
      <MenuButton as={Fragment}>
        {({ active }) => (
          <button
            className={clsx(
              "bg-amber-700 text-slate-200 px-2 py-1 text-base outline-amber-500 rounded-md",
              active && "bg-sky-700"
            )}
          >
            My Account{" "}
            {active ? (
              <ChevronUpIcon className="size-4 inline" />
            ) : (
              <ChevronDownIcon className="size-4 inline" />
            )}
          </button>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        transition
        className="backdrop-blur-md px-1 space-y-1 outline-none w-(--button-width) origin-left transition duration-300 ease-out data-closed:scale-x-15 data-closed:opacity-0"
      >
        <MenuSection>
          <MenuHeading className="text-sm text-sky-700">Contents</MenuHeading>
          <MenuItem>
            <a className="block data-focus:bg-sky-500 px-1" href="/settings">
              Settings
            </a>
          </MenuItem>
          <MenuItem>
            <a className="block data-focus:bg-sky-500 px-1" href="/support">
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a className="block data-focus:bg-sky-500 px-1" href="/license">
              License
            </a>
          </MenuItem>
        </MenuSection>
        <MenuSeparator className="h-px my-1 bg-linear-[90deg,--theme(--color-slate-500/100%)_0%,--theme(--color-slate-500/90%)_65%,--theme(--color-slate-500/0%)_100%]" />
        <MenuSection>
          <MenuHeading className="text-sm text-sky-700">Actions</MenuHeading>
          <MenuItem disabled>
            <button
              onClick={signOut}
              className="block w-full text-left px-1 data-focus:bg-blue-100 data-disabled:text-gray-600"
            >
              Sign me out
            </button>
          </MenuItem>
        </MenuSection>
      </MenuItems>
    </Menu>
  );
}
