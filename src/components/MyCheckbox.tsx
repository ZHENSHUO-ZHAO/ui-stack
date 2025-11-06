import { Checkbox, Description, Field, Label } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function MyCheckbox() {
  const [enabled, setEnabled] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Form data:", Object.fromEntries(formData.entries()));
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <Field>
        <Description className="text-gray-400">
          This will set your default shipping address.
        </Description>
        <div className="flex items-center gap-2">
          <Checkbox
            as="div"
            name="default-shipping-address"
            value="shipping-address"
            checked={enabled}
            onChange={setEnabled}
            className="group size-6 rounded-full bg-slate-500 flex justify-center items-center transition duration-300 ease-in-out data-checked:bg-lime-500 data-disable:bg-slate-800"
          >
            <CheckIcon className="size-4 fill-black transition duration-300 ease-in-out group-data-checked:fill-slate-50 group-data-disabled:fill-slate-600" />
          </Checkbox>
          <Label>Set as Default</Label>
        </div>
      </Field>
      <button type="submit">Submit</button>
    </form>
  );
}
