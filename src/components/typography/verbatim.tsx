import { cn } from "@/lib/utils";
import React from "react";

export function Verbatim({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "font-mono relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-sm font-semibold",
        className
      )}
      {...props}
    />
  );
}
