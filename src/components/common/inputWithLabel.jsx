/* eslint-disable react/prop-types */
import { Label } from "../ui/label.tsx";
import { Input } from "../ui/input.tsx";

export default function InputWithLabel({
  id,
  name,
  value,
  onChange,
  error,
  required,
  label,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label
        className={`${error && !value ? "text-red-500" : ""}`}
        htmlFor={id}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        className={`${error && !value ? "border-red-500" : ""}`}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
