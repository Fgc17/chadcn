import { cn } from "chadcn/lib/utils";
import * as React from "react";

export function Tabular({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return <table className={cn("w-full", className)} {...props} />;
}
