"use client";

import * as React from "react";
import {
  FieldPath,
  FieldValues,
  Path,
  UseFormGetFieldState,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import * as Headless from "@headlessui/react";
import { useParentForm } from "./form";
import { cva, VariantProps } from "class-variance-authority";

const fieldVariants = cva(
  cn(
    // Group
    "group",

    // Disabled state
    cn(
      // Opacity
      "group-data-[disabled]:opacity-50 disabled:opacity-50 has-[[data-disabled]]:opacity-50",

      // Cursor
      "group-data-[disabled]:cursor-not-allowed disabled:cursor-not-allowed has-[[data-disabled]]:cursor-not-allowed",

      // Selection
      "group-data-[disabled]:select-none disabled:select-none has-[[data-disabled]]:select-none"
    )
  ),
  {
    variants: {
      variant: {
        default: cn(
          "[&>[data-slot=label]+[data-slot=control]]:mt-1.5",
          "[&>[data-slot=label]+[data-slot=description]]:mt-1",
          "[&>[data-slot=description]+[data-slot=control]]:mt-1.5",
          "[&>[data-slot=control]+[data-slot=description]]:mt-1.5",
          "[&>[data-slot=control]+[data-slot=error]]:mt-1.5",
          "[&>[data-slot=label]]:font-medium"
        ),
        switch: cn(
          "grid grid-cols-[1fr_auto]",
          "items-center gap-x-8 gap-y-1 sm:grid-cols-[1fr_auto]",

          "[&>[data-slot=control]]:col-start-2 [&>[data-slot=control]]:self-center",

          "[&>[data-slot=label]]:col-start-1 [&>[data-slot=label]]:row-start-1 [&>[data-slot=label]]:justify-self-start",

          "[&>[data-slot=description]]:col-start-1 [&>[data-slot=description]]:row-start-2",

          "[&_[data-slot=label]]:has-[[data-slot=description]]:font-medium"
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type FieldProps<Fields extends FieldValues> = Headless.FieldProps &
  VariantProps<typeof fieldVariants> & {
    name: Path<Fields>;
  };

type FieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ReturnType<UseFormGetFieldState<TFieldValues>> & {
  id: string;
  name: TName;
};

export function Fieldset({
  className,
  ...props
}: { className?: string } & Omit<Headless.FieldsetProps, "className">) {
  return (
    <Headless.Fieldset
      {...props}
      data-fieldset
      className={cn(
        "group [&>*+[data-slot=control]]:mt-6 [&>[data-slot=text]]:mt-1",
        className
      )}
    />
  );
}

export function Legend({
  className,
  ...props
}: { className?: string } & Omit<Headless.LegendProps, "className">) {
  return (
    <Headless.Legend
      data-slot="legend"
      {...props}
      className={cn(
        className,
        "text-base/6 font-semibold text-zinc-950 data-[disabled]:opacity-50 dark:text-white sm:text-sm/6"
      )}
    />
  );
}

export function FieldGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="control"
      {...props}
      className={cn(className, "space-y-8")}
    />
  );
}

const FieldContext = React.createContext<FieldContextValue>(
  {} as FieldContextValue
);

export const useField = () => React.useContext(FieldContext);

function Field<Fields extends FieldValues>({
  className,
  variant = "default",
  ...props
}: FieldProps<Fields>) {
  const { formState, getFieldState } = useParentForm();

  const id = React.useId();

  const name = props["name"];

  const fieldState = getFieldState(name, formState);

  let contextValue: FieldContextValue<Fields> = {
    id,
    name,
    ...fieldState,
  };

  return (
    <FieldContext.Provider value={contextValue}>
      <Headless.Field
        {...props}
        data-invalid={fieldState.invalid ? "" : undefined}
        data-slot="field"
        className={cn(fieldVariants({ variant }), className)}
      />
    </FieldContext.Provider>
  );
}

export const createField =
  <Fields extends FieldValues>() =>
  (props: FieldProps<Fields>) => <Field {...props} />;

export function Label({
  className,
  ...props
}: { className?: string; enableAsterisk?: boolean } & Omit<
  Headless.LabelProps,
  "className"
>) {
  return (
    <Headless.Label
      {...props}
      data-slot="label"
      className={cn(
        "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-[invalid]:text-destructive",
        className
      )}
    />
  );
}

export function Description({
  className,
  ...props
}: { className?: string } & Omit<Headless.DescriptionProps, "className">) {
  return (
    <Headless.Description
      {...props}
      data-slot="description"
      className={cn("text-sm text-muted-foreground", className)}
    />
  );
}

export function ErrorMessage({
  className,
  ...props
}: { className?: string } & Omit<Headless.DescriptionProps, "className">) {
  const { error } = useField();

  return (
    <Headless.Description
      {...props}
      data-slot="error"
      className={cn(
        "text-sm/6 text-red-600 data-[disabled]:opacity-50 dark:text-red-500",
        className
      )}
    >
      {error ? error.message : " "}
    </Headless.Description>
  );
}
