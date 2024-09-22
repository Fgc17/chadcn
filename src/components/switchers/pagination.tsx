import clsx from "clsx";
import type React from "react";
import { Button } from "../button";
import Link from "next/link";
import { Icon } from "../icon";

export function Pagination({
  "aria-label": ariaLabel = "Page navigation",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      aria-label={ariaLabel}
      {...props}
      className={clsx(className, "flex items-center")}
    />
  );
}

export function PaginationPrevious({
  href,
  children = "Previous",
  onClick,
  disabled = false,
}: {
  onClick?: () => void;
  href?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <span className="grow basis-0">
      <Link href={href ?? ""}>
        <Button
          onClick={onClick}
          variant="plain"
          disabled={disabled}
          aria-label="Previous page"
          className="text-sm"
        >
          <Icon name="ArrowLeft" className="w-4" />
          {children}
        </Button>
      </Link>
    </span>
  );
}

export function PaginationNext({
  href,
  children = "Next",
  onClick,
  disabled = false,
}: {
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  children?: React.ReactNode;
}) {
  return (
    <span className="flex grow basis-0 justify-end">
      <Link href={href ?? ""}>
        <Button
          onClick={onClick}
          variant="plain"
          disabled={disabled}
          aria-label="Next page"
          className="text-sm"
        >
          {children}
          <Icon name="ArrowRight" className="w-4" />
        </Button>
      </Link>
    </span>
  );
}

export function PaginationList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={clsx("flex items-baseline *:text-xs", className)}>
      {children}
    </span>
  );
}

export function PaginationPage({
  href,
  children,
  current = false,
  onClick,
  className,
}: {
  href?: string;
  children: string;
  current?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link href={href ?? ""}>
      <Button
        variant="plain"
        aria-label={`Page ${children}`}
        aria-current={current ? "page" : undefined}
        onClick={onClick}
        className={clsx(
          "min-w-[2.25rem] text-sm before:absolute before:-inset-px before:rounded-lg",
          current && "before:bg-zinc-950/5",
          className
        )}
      >
        <span className="-mx-0.5">{children}</span>
      </Button>
    </Link>
  );
}

export function PaginationGap() {
  return (
    <div
      aria-hidden="true"
      className="w-[2.25rem] select-none text-center text-sm/6 font-semibold text-zinc-950"
    >
      &hellip;
    </div>
  );
}
