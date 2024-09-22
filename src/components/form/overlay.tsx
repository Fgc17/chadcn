// client
"use client";

import { cn } from "chadcn/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const overlayClasses = cva("", {
  variants: {
    variant: {
      default: cn(
        // Basic layouts
        "relative block w-full",

        // Focus ring
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-md after:ring-inset after:ring-transparent has-[:focus]:after:ring-2",

        // Valid state
        "before:shadow-blue-500/10 after:ring-blue-500",

        // Invalid state
        "has-[invalid]:shadow-red-500/10 group-data-[invalid]:after:ring-red-500 has-[[data-invalid]]:shadow-red-500/10 has-[[data-invalid]]:after:ring-red-500",

        // Disabled
        "group-data-[disabled]:bg-zinc-950/5 disabled:bg-zinc-950/5 has-[[data-disabled]]:bg-zinc-950/5",
        "group-data-[disabled]:shadow-none disabled:shadow-none has-[[data-disabled]]:shadow-none"
      ),
      select: cn(
        // Basic layouts
        "relative block w-full",

        // Focus ring
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-md after:ring-inset after:ring-transparent has-[[data-state=open]]:after:ring-2",

        // Valid state
        "before:shadow-blue-500/10 after:ring-blue-500",

        // Invalid state
        "group-data-[invalid]:shadow-red-500/10 group-data-[invalid]:after:ring-red-500 has-[[data-invalid]]:shadow-red-500/10 has-[[data-invalid]]:after:ring-red-500",

        // Disabled
        "group-data-[disabled]:bg-zinc-950/5 disabled:bg-zinc-950/5 has-[[data-disabled]]:bg-zinc-950/5",
        "group-data-[disabled]:shadow-none disabled:shadow-none has-[[data-disabled]]:shadow-none"
      ),
      radioGroup: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Overlay({
  variant,
  className,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof overlayClasses>) {
  return (
    <span
      data-slot="control"
      className={cn(overlayClasses({ variant }), className)}
      {...props}
    />
  );
}
