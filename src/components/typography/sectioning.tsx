import { cn } from "@/lib/utils";
import * as React from "react";

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

export type TextProps = React.HTMLAttributes<HTMLParagraphElement>;

export function Page({ className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn("scroll-m-20 text-2xl font-bold tracking-tight", className)}
      {...props}
    />
  );
}

export function Section({ className, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  );
}

export function Subsection({ className, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function Subsubsection({ className, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function Text({ className, ...props }: TextProps) {
  return <p className={cn("text-sm leading-7", className)} {...props} />;
}
