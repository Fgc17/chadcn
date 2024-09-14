/** Credits:  */
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const loaderVariants = cva("animate-spin text-primary", {
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

interface SpinnerContentProps extends VariantProps<typeof loaderVariants> {
  className?: string;
}

export function Spinner({ size, show, className }: SpinnerContentProps) {
  return (
    <div className={cn(loaderVariants({ size, show: Boolean(show) }))}>
      <Loader2 className={className} />
    </div>
  );
}
