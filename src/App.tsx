import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function Example() {
  return (
    <Menu>
      <MenuButton>My account</MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

function App() {
  return (
    <>
      <div>
        <AdjustmentsVerticalIcon className="fill-amber-700 size-8" />
        <p className="text-amber-600">
          Click on the Vite and React logos to learn more
        </p>
      </div>
      <Example />
    </>
  );
}

export default App;
