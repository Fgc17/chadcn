"use client";

import * as Headless from "@headlessui/react";
import clsx from "clsx";
import React, { useId } from "react";
import { Link } from "../navigation/link";
import {
  Sheet,
  SheetClose,
  SheetTrigger,
  SheetContent,
} from "../floating/sheet";

export function Sidebar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      {...props}
      className={clsx(className, "flex h-full min-h-0 flex-col")}
    />
  );
}

export const MobileSidebar = Sheet;

export const MobileSidebarClose = SheetClose;

export const MobileSidebarTrigger = SheetTrigger;

export function MobileSidebarContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetContent>) {
  return (
    <SheetContent
      {...props}
      className="inset-2 flex h-[98%] w-auto max-w-80 flex-col gap-0 rounded-lg bg-white p-0 shadow-sm ring-1 ring-zinc-950/5 data-[slot=close]:*:hidden dark:bg-zinc-900 dark:ring-white/10"
      side={"left"}
    />
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5"
      )}
    />
  );
}

export function SidebarBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex flex-1 flex-col gap-2 overflow-y-auto p-4"
      )}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5"
      )}
    />
  );
}

export function SidebarSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  let id = useId();

  return (
    <div
      {...props}
      data-slot="section"
      className={clsx(className, "flex flex-col gap-0.5")}
    />
  );
}

export function SidebarDivider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      {...props}
      className={clsx(
        className,
        "my-4 border-t border-zinc-950/5 dark:border-white/5 lg:-mx-4"
      )}
    />
  );
}

export function SidebarSpacer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsx(className, "mt-8 flex-1")}
    />
  );
}

export function SidebarHeading({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      {...props}
      className={clsx(
        className,
        "px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400"
      )}
    />
  );
}

export function SidebarItem({
  current,
  className,
  children,
  ...props
}: {
  current?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
} & (
  | Omit<Headless.ButtonProps, "className">
  | Omit<React.ComponentPropsWithoutRef<typeof Link>, "type" | "className">
)) {
  let classes = clsx(
    // Base
    "flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5",
    // Leading icon/icon-only
    "data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:size-[1.35rem]",
    // Trailing icon (down chevron or similar)
    "data-[slot=icon]:last:*:ml-auto data-[slot=icon]:last:*:size-5 sm:data-[slot=icon]:last:*:size-4",
    // Avatar
    "data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=avatar]:*:[--ring-opacity:10%] sm:data-[slot=avatar]:*:size-6",
    // Dark mode
    "dark:text-white dark:data-[slot=icon]:*:fill-zinc-400",
    "dark:data-[slot=icon]:*:data-[current]:fill-white",
    props.disabled && "opacity-50 pointer-events-none",
    !props.disabled && [
      // Hover
      "data-[hover]:bg-zinc-950/5",
      // Active
      "data-[active]:bg-zinc-950/5 ",
      // Dark Mode
      "dark:data-[hover]:bg-white/5 dark:data-[slot=icon]:*:data-[hover]:fill-white",
      "dark:data-[active]:bg-white/5 dark:data-[slot=icon]:*:data-[active]:fill-white",
    ]
  );

  return (
    <span className={clsx(className, "relative")}>
      {current && (
        <span className="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white" />
      )}
      {"href" in props ? (
        <MobileSidebarClose asChild>
          <Link
            className={classes}
            {...props}
            data-current={current ? "true" : undefined}
          >
            {children}
          </Link>
        </MobileSidebarClose>
      ) : (
        <Headless.Button
          {...props}
          className={clsx("cursor-default", classes)}
          data-current={current ? "true" : undefined}
        >
          {children}
        </Headless.Button>
      )}
    </span>
  );
}

export function SidebarLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={clsx(className, "truncate")} />;
}
