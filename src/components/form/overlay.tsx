// client
"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const overlayClasses = cva("", {
  variants: {
    variant: {
      default: [
        // Basic layouts
        "relative block w-full",

        // Focus ring
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-md after:ring-inset after:ring-transparent focus-within:after:ring-2",

        // Disabled state
        "has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none",

        // Invalid state
        "group-data-[invalid]:shadow-red-500/10 group-data-[invalid]:after:ring-red-500",

        // Valid state
        "before:shadow-blue-500/10 after:ring-blue-500",
      ],
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
