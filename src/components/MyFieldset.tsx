import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";

const cities: string[] = [
  "Melbourne",
  "Sydney",
  "Tasmania",
  "Darwin",
  "Gold Coast",
  "Perth",
  "Brisbane",
];

export default function MyFieldset() {
  return (
    <Fieldset className="space-y-2">
      <Legend className="text-lg font-bold">Shipping Details</Legend>
      <Field>
        <Label className="block mb-1">Address</Label>
        <Input
          name="address"
          className="bg-slate-300 text-gray-900 rounded-lg px-2"
        />
      </Field>
      <Field>
        <Label className="block mb-1">City</Label>
        <Select
          name="city"
          className="bg-slate-300 text-gray-900 rounded-lg px-2"
        >
          {cities.map((city) => (
            <option>{city}</option>
          ))}
        </Select>
      </Field>
      <Field>
        <Label className="block mb-1">Delivery Notes</Label>
        <Textarea
          name="notes"
          rows={3}
          className="bg-slate-300 text-gray-900 rounded-lg px-2 resize-none"
        ></Textarea>
      </Field>
    </Fieldset>
  );
}
