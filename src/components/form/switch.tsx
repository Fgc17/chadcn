"use client";

import * as Headless from "@headlessui/react"; // Using Headless UI for the Switch
import { cn } from "@/lib/utils";
import { useField } from "./field";
import { Control, useParentForm } from "./form";

export type SwitchProps = Headless.SwitchProps;

export function PrimitiveSwitch({ className, ...props }: SwitchProps) {
  return (
    <Headless.Switch
      className={cn(
        "group peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 translate-x-0 rounded-full bg-background shadow-lg ring-0 transition-transform group-data-[checked]:translate-x-5"
        )}
      />
    </Headless.Switch>
  );
}

export function Switch({ className, onChange, ...props }: SwitchProps) {
  return (
    <Control>
      {({ field: { onChange: fieldOnChange, value, ...field } }) => (
        <PrimitiveSwitch
          checked={value || ""}
          onChange={(checked) => {
            onChange && onChange(checked);
            fieldOnChange(checked);
          }}
          className={className}
          {...props}
          {...field}
        />
      )}
    </Control>
  );
}
