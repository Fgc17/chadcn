"use client";

import * as React from "react";
import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "chadcn/lib/utils";

const Dropdown = DropdownPrimitive.Root;
const DropdownTrigger = DropdownPrimitive.Trigger;
const DropdownGroup = DropdownPrimitive.Group;
const DropdownPortal = DropdownPrimitive.Portal;
const DropdownSub = DropdownPrimitive.Sub;
const DropdownRadioGroup = DropdownPrimitive.RadioGroup;

function DropdownSubTrigger(
  props: React.ComponentProps<typeof DropdownPrimitive.SubTrigger> & {
    inset?: boolean;
  }
) {
  return (
    <DropdownPrimitive.SubTrigger
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 data-[state=open]:bg-gray-100 dark:focus:bg-gray-800 dark:data-[state=open]:bg-gray-800",
        props.inset && "pl-8",
        props.className
      )}
      {...props}
    >
      {props.children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownPrimitive.SubTrigger>
  );
}

function DropdownSubContent(
  props: React.ComponentProps<typeof DropdownPrimitive.SubContent>
) {
  return (
    <DropdownPrimitive.SubContent
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50",
        props.className
      )}
      {...props}
    />
  );
}

function DropdownContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Content> & {
  sideOffset?: number;
}) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        sideOffset={props.sideOffset ?? 4}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50",
          className
        )}
        {...props}
      />
    </DropdownPrimitive.Portal>
  );
}

function DropdownItem(
  props: React.ComponentProps<typeof DropdownPrimitive.Item> & {
    inset?: boolean;
  }
) {
  return (
    <DropdownPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
        "[&>[data-slot=icon]]:mr-2 [&>[data-slot=icon]]:h-4 [&>[data-slot=icon]]:w-4",
        props.inset && "pl-8",
        props.className
      )}
      {...props}
    />
  );
}

function DropdownCheckboxItem(
  props: React.ComponentProps<typeof DropdownPrimitive.CheckboxItem>
) {
  return (
    <DropdownPrimitive.CheckboxItem
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
        props.className
      )}
      checked={props.checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownPrimitive.ItemIndicator>
      </span>
      {props.children}
    </DropdownPrimitive.CheckboxItem>
  );
}

function DropdownRadioItem(
  props: React.ComponentProps<typeof DropdownPrimitive.RadioItem>
) {
  return (
    <DropdownPrimitive.RadioItem
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
        props.className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownPrimitive.ItemIndicator>
      </span>
      {props.children}
    </DropdownPrimitive.RadioItem>
  );
}

function DropdownLabel(
  props: React.ComponentProps<typeof DropdownPrimitive.Label> & {
    inset?: boolean;
  }
) {
  return (
    <DropdownPrimitive.Label
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        props.inset && "pl-8",
        props.className
      )}
      {...props}
    />
  );
}

function DropdownSeparator(
  props: React.ComponentProps<typeof DropdownPrimitive.Separator>
) {
  return (
    <DropdownPrimitive.Separator
      className={cn(
        "-mx-1 my-1 h-px bg-gray-100 dark:bg-gray-800",
        props.className
      )}
      {...props}
    />
  );
}

function DropdownShortcut(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest opacity-60",
        props.className
      )}
      {...props}
    />
  );
}

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownCheckboxItem,
  DropdownRadioItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownShortcut,
  DropdownGroup,
  DropdownPortal,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
  DropdownRadioGroup,
};
