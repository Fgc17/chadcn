import { cn } from "chadcn/lib/utils";
import * as React from "react";

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
export type TextProps = React.HTMLAttributes<HTMLParagraphElement>;
export type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Text({ className, ...props }: TextProps) {
  return <p className={cn("text-sm leading-6", className)} {...props} />;
}

export function Page({ title, className, children, ...props }: DivProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {title && <PageTitle>{title}</PageTitle>}
      {children}
    </div>
  );
}

export function PageHeading(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <div {...props} />;
}

export function PageTitle({ className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn("scroll-m-20 text-2xl font-bold tracking-tight", className)}
      {...props}
    />
  );
}

export function Section({ title, className, children, ...props }: DivProps) {
  return (
    <section className={cn("space-y-3", className)} {...props}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </section>
  );
}

export function SectionHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <div className={cn("border-b pb-2", className)} {...props} />;
}

export function SectionTitle({ className, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  );
}

export function Subsection({ title, className, children, ...props }: DivProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {title && <SubsectionTitle>{title}</SubsectionTitle>}
      {children}
    </div>
  );
}

export function SubsectionHeading(
  props: React.HTMLAttributes<HTMLHeadingElement>
) {
  return <div {...props} />;
}

export function SubsectionTitle({ className, ...props }: HeadingProps) {
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

export function Subsubsection({
  title,
  className,
  children,
  ...props
}: DivProps) {
  return (
    <div className={cn("space-y-1 text-base", className)} {...props}>
      {title && <SubsubsectionTitle>{title}</SubsubsectionTitle>}
      {children}
    </div>
  );
}

export function SubsubsectionTitle({ className, ...props }: HeadingProps) {
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
