import * as React from "react";
import * as Headless from "@headlessui/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        variable: "px-4 py-2",
      },
      loading: {
        true: "cursor-wait flex items-center gap-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends Headless.ButtonProps,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  variant,
  size,
  children,
  asChild = false,
  loading,
  ...props
}: ButtonProps) {
  const cname = cn(buttonVariants({ variant, size, className }));

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
      className={cn(buttonVariants({ variant, loading, size, className }))}
      disabled={props.disabled || loading}
      {...props}
    >
      {children as React.ReactNode}
      <Spinner size={"small"} show={loading} />
    </Headless.Button>
  );
}

export { type ButtonProps, Button, buttonVariants };
