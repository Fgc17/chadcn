import * as React from "react";
import * as Headless from "@headlessui/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "chadcn/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  cn(
    // Base
    "relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold",

    // Sizing
    "px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6",

    // Focus
    "focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500",

    // Disabled
    "data-[disabled]:opacity-50",

    // Icon
    "[&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText]"
  ),
  {
    variants: {
      variant: {
        solid: [
          // Button background
          "bg-[--btn-bg] border-none",

          // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
          "after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)]",

          // White overlay on hover
          "after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay]",

          // Dark mode: `after` layer expands to cover entire button
          "dark:after:-inset-px dark:after:rounded-lg",

          // Disabled
          "before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none",
        ],
        outline: [
          // Base
          "data-[active]:bg-zinc-950/[2.5%] data-[hover]:bg-zinc-950/[2.5%]",

          // Dark mode
          "dark:[--btn-bg:transparent] -[active]:bg-white/5 -[hover]:bg-white/5",
        ],
        plain: [
          // Base
          "border-transparent text-zinc-950 data-[active]:bg-zinc-950/5 data-[active]:bg-zinc-950/5",

          // Dark mode
          "data-[hover]:bg-zinc-950/5  -[active]:bg-white/10 -[active]:bg-white/10 -[hover]:bg-white/10",
        ],
        link: "text-primary underline-offset-4 hover:underline",
      },
      color: {
        auto: "",
        "dark/zinc": [
          "text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
          "dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)]",
          "[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)]",
        ],
        light: [
          "text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)] data-[active]:[--btn-border:theme(colors.zinc.950/15%)] data-[hover]:[--btn-border:theme(colors.zinc.950/15%)]",
          " dark:[--btn-hover-overlay:theme(colors.white/5%)] dark:[--btn-bg:theme(colors.zinc.800)]",
          "[--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)] dark:[--btn-icon:theme(colors.zinc.500)] -[active]:[--btn-icon:theme(colors.zinc.400)] -[hover]:[--btn-icon:theme(colors.zinc.400)]",
        ],
        "dark/white": [
          "text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
          " dark:[--btn-bg:white] dark:[--btn-hover-overlay:theme(colors.zinc.950/2.5%)] dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]",
          "[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)] dark:[--btn-icon:theme(colors.zinc.500)] -[active]:[--btn-icon:theme(colors.zinc.400)] -[hover]:[--btn-icon:theme(colors.zinc.400)]",
        ],
        dark: [
          "text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]",
          "dark:[--btn-hover-overlay:theme(colors.white/5%)] dark:[--btn-bg:theme(colors.zinc.800)]",
          "[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)]",
        ],
        white: [
          "text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)] data-[active]:[--btn-border:theme(colors.zinc.950/15%)] data-[hover]:[--btn-border:theme(colors.zinc.950/15%)]",
          "dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]",
          "[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.500)] data-[hover]:[--btn-icon:theme(colors.zinc.500)]",
        ],
        gray: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.gray.600)] [--btn-border:theme(colors.gray.700/90%)]",
          "dark:[--btn-hover-overlay:theme(colors.white/5%)]",
          "[--btn-icon:theme(colors.gray.400)] data-[active]:[--btn-icon:theme(colors.gray.300)] data-[hover]:[--btn-icon:theme(colors.gray.300)]",
        ],
        zinc: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.zinc.600)] [--btn-border:theme(colors.zinc.700/90%)]",
          "dark:[--btn-hover-overlay:theme(colors.white/5%)]",
          "[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)]",
        ],
        neutral: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.neutral.600)] [--btn-border:theme(colors.neutral.700/90%)]",
          "dark:[--btn-hover-overlay:theme(colors.white/5%)]",
          "[--btn-icon:theme(colors.neutral.400)] data-[active]:[--btn-icon:theme(colors.neutral.300)] data-[hover]:[--btn-icon:theme(colors.neutral.300)]",
        ],
        stone: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.stone.600)] [--btn-border:theme(colors.stone.700/90%)]",
          "dark:[--btn-hover-overlay:theme(colors.white/5%)]",
          "[--btn-icon:theme(colors.stone.400)] data-[active]:[--btn-icon:theme(colors.stone.300)] data-[hover]:[--btn-icon:theme(colors.stone.300)]",
        ],
        indigo: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.indigo.500)] [--btn-border:theme(colors.indigo.600/90%)]",
          "[--btn-icon:theme(colors.indigo.300)] data-[active]:[--btn-icon:theme(colors.indigo.200)] data-[hover]:[--btn-icon:theme(colors.indigo.200)]",
        ],
        cyan: [
          "text-cyan-950 [--btn-bg:theme(colors.cyan.300)] [--btn-border:theme(colors.cyan.400/80%)] [--btn-hover-overlay:theme(colors.white/25%)]",
          "[--btn-icon:theme(colors.cyan.500)]",
        ],
        red: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.red.600)] [--btn-border:theme(colors.red.700/90%)]",
          "[--btn-icon:theme(colors.red.300)] data-[active]:[--btn-icon:theme(colors.red.200)] data-[hover]:[--btn-icon:theme(colors.red.200)]",
        ],
        orange: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.orange.500)] [--btn-border:theme(colors.orange.600/90%)]",
          "[--btn-icon:theme(colors.orange.300)] data-[active]:[--btn-icon:theme(colors.orange.200)] data-[hover]:[--btn-icon:theme(colors.orange.200)]",
        ],
        amber: [
          "text-amber-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.amber.400)] [--btn-border:theme(colors.amber.500/80%)]",
          "[--btn-icon:theme(colors.amber.700)]",
        ],
        yellow: [
          "text-yellow-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.yellow.300)] [--btn-border:theme(colors.yellow.400/80%)]",
          "[--btn-icon:theme(colors.yellow.600)] data-[active]:[--btn-icon:theme(colors.yellow.700)] data-[hover]:[--btn-icon:theme(colors.yellow.700)]",
        ],
        lime: [
          "text-lime-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.lime.300)] [--btn-border:theme(colors.lime.400/80%)]",
          "[--btn-icon:theme(colors.lime.600)] data-[active]:[--btn-icon:theme(colors.lime.700)] data-[hover]:[--btn-icon:theme(colors.lime.700)]",
        ],
        green: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.green.600)] [--btn-border:theme(colors.green.700/90%)]",
          "[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]",
        ],
        emerald: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.emerald.600)] [--btn-border:theme(colors.emerald.700/90%)]",
          "[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]",
        ],
        teal: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.teal.600)] [--btn-border:theme(colors.teal.700/90%)]",
          "[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]",
        ],
        sky: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.sky.500)] [--btn-border:theme(colors.sky.600/80%)]",
          "[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]",
        ],
        blue: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.blue.600)] [--btn-border:theme(colors.blue.700/90%)]",
          "[--btn-icon:theme(colors.blue.400)] data-[active]:[--btn-icon:theme(colors.blue.300)] data-[hover]:[--btn-icon:theme(colors.blue.300)]",
        ],
        violet: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.violet.500)] [--btn-border:theme(colors.violet.600/90%)]",
          "[--btn-icon:theme(colors.violet.300)] data-[active]:[--btn-icon:theme(colors.violet.200)] data-[hover]:[--btn-icon:theme(colors.violet.200)]",
        ],
        purple: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.purple.500)] [--btn-border:theme(colors.purple.600/90%)]",
          "[--btn-icon:theme(colors.purple.300)] data-[active]:[--btn-icon:theme(colors.purple.200)] data-[hover]:[--btn-icon:theme(colors.purple.200)]",
        ],
        fuchsia: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.fuchsia.500)] [--btn-border:theme(colors.fuchsia.600/90%)]",
          "[--btn-icon:theme(colors.fuchsia.300)] data-[active]:[--btn-icon:theme(colors.fuchsia.200)] data-[hover]:[--btn-icon:theme(colors.fuchsia.200)]",
        ],
        pink: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.pink.500)] [--btn-border:theme(colors.pink.600/90%)]",
          "[--btn-icon:theme(colors.pink.300)] data-[active]:[--btn-icon:theme(colors.pink.200)] data-[hover]:[--btn-icon:theme(colors.pink.200)]",
        ],
        rose: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.rose.500)] [--btn-border:theme(colors.rose.600/90%)]",
          "[--btn-icon:theme(colors.rose.300)] data-[active]:[--btn-icon:theme(colors.rose.200)] data-[hover]:[--btn-icon:theme(colors.rose.200)]",
        ],
        slate: [
          "text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.slate.500)] [--btn-border:theme(colors.slate.600/90%)]",
          "[--btn-icon:theme(colors.slate.300)] data-[active]:[--btn-icon:theme(colors.slate.200)] data-[hover]:[--btn-icon:theme(colors.slate.200)]",
        ],
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        variable: "px-4 py-2",
      },
      loading: {
        true: "cursor-wait flex items-center gap-2 [&>[data-slot=icon]]:hidden",
        false: "",
      },
    },
    defaultVariants: {
      color: "dark/zinc",
      variant: "solid",
      size: "default",
    },
  }
);

interface ButtonProps
  extends Omit<Headless.ButtonProps, "color">,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  color,
  variant,
  size,
  children,
  asChild = false,
  loading,
  ...props
}: ButtonProps) {
  if (variant && variant != "solid") color = "auto";

  const cname = cn(buttonVariants({ color, variant, size }), className);

  if (asChild) {
    return (
      <Slot
        className={cname}
        children={children as React.ReactNode}
        {...props}
      />
    );
  }

  return (
    <Headless.Button
      className={cn(
        buttonVariants({ color, variant, loading, size, className })
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {children as React.ReactNode}
      <Spinner size={"small"} show={loading} />
    </Headless.Button>
  );
}

export { type ButtonProps, Button, buttonVariants };
