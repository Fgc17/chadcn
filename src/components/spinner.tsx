/** Credits:  */
import { cn } from "chadcn/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      small: "*:size-6",
      medium: "*:size-8",
      large: "*:size-12",
    },
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerContentProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function Spinner({ size, show, className }: SpinnerContentProps) {
  return (
    <span
      data-slot="spinner"
      className={cn(spinnerVariants({ size, show: Boolean(show) }))}
    >
      <Loader2 className={className} />
    </span>
  );
}
