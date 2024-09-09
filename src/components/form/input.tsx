import * as Headless from "@headlessui/react";

import { cn } from "@/lib/utils";
import { useField } from "./field";
import { Control, useParentForm } from "./form";
import { MaskType, useMask } from "@/hooks/use-mask";
import { Overlay } from "./overlay";

const webkitCss = [
  "[&::-webkit-datetime-edit-fields-wrapper]:p-0",
  "[&::-webkit-date-and-time-value]:min-h-[1.5em]",
  "[&::-webkit-datetime-edit]:inline-flex",
  "[&::-webkit-datetime-edit]:p-0",
  "[&::-webkit-datetime-edit-year-field]:p-0",
  "[&::-webkit-datetime-edit-month-field]:p-0",
  "[&::-webkit-datetime-edit-day-field]:p-0",
  "[&::-webkit-datetime-edit-hour-field]:p-0",
  "[&::-webkit-datetime-edit-minute-field]:p-0",
  "[&::-webkit-datetime-edit-second-field]:p-0",
  "[&::-webkit-datetime-edit-millisecond-field]:p-0",
  "[&::-webkit-datetime-edit-meridiem-field]:p-0",
];

const dateTypes = ["date", "datetime-local", "month", "time", "week"];

type DateType = (typeof dateTypes)[number];

export interface InputProps extends Headless.InputProps {
  type?: Headless.InputProps["type"] | DateType;
  invalid?: boolean;
}

export function PrimitiveInput({ className, type, ...props }: InputProps) {
  return (
    <Overlay>
      <Headless.Input
        type={type}
        className={cn(
          // Layout & Spacing
          "flex w-full px-3 py-2",

          // Size
          "h-10 text-sm",

          // Border & Radius
          "rounded-md border border-gray-200 outline-none",

          // Background
          "bg-white ring-offset-white",

          // File Input
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",

          // Placeholder Text
          "placeholder:text-gray-500",

          // Invalid State
          "group-data-[invalid]:border-red-500",

          // Disabled State
          "disabled:cursor-not-allowed disabled:opacity-50",

          // Dark Mode
          "dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400",

          className
        )}
        {...props}
      />
    </Overlay>
  );
}

export function Input({
  className,
  type,
  onChange,
  mask,
  ...props
}: InputProps & {
  mask?: MaskType;
}) {
  const form = useParentForm();
  const { name } = useField();
  const { maskit } = useMask();

  return (
    <Control name={name} control={form.control}>
      {({ field: { onChange: fieldOnChange, value, ref, ...field } }) => (
        <PrimitiveInput
          className={cn([type && dateTypes.includes(type) && webkitCss])}
          onChange={(e) => {
            const value = e.target.value;
            onChange && onChange(e);
            fieldOnChange(
              mask
                ? maskit(value, mask)
                : type === "number"
                  ? Number(value)
                  : value
            );
          }}
          value={value || ""}
          type={type}
          {...props}
          {...field}
        />
      )}
    </Control>
  );
}
