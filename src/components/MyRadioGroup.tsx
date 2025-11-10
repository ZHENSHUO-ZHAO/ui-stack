import {
  Description,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const plans = [
  { name: "Startup", ram: "12GB", cpu: "6 CPUs", disk: "256GB SSD disk" },
  { name: "Business", ram: "16GB", cpu: "8 CPUs", disk: "512GB SSD disk" },
  { name: "Enterprise", ram: "32GB", cpu: "12 CPUs", disk: "1TB SSD disk" },
];

export default function MyRadioGroup() {
  const [selectedPlan, setPlan] = useState();

  return (
    <RadioGroup
      value={selectedPlan}
      onChange={setPlan}
      className="bg-slate-800 rounded-md size-fit p-4 space-y-4"
    >
      {plans.map((p) => (
        <Field key={p.name}>
          <Radio
            as="div"
            value={p}
            className="group bg-slate-700 py-2 px-4 rounded-md flex gap-5 justify-between items-center data-hover:bg-slate-600"
          >
            <div>
              <Label className="block text-teal-600 font-semibold text-lg group-data-checked:text-teal-300">
                {p.name}
              </Label>
              <Description className="text-slate-400 group-data-checked:text-slate-100">
                {p.ram} &middot; {p.cpu} &middot; {p.disk}
              </Description>
            </div>
            <CheckCircleIcon className="invisible size-5 fill-teal-300 group-data-checked:visible" />
          </Radio>
        </Field>
      ))}
    </RadioGroup>
  );
}
