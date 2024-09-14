"use client";

import * as React from "react";
import * as Headless from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Separator, SeparatorProps } from "./typography/separator";
import { ScrollArea } from "./wireframe/scroll-area";
import { Search } from "lucide-react";

function Command<Value, Multiple extends boolean>({
  as = "div",
  className,
  ...props
}: Headless.ComboboxProps<Value, Multiple, keyof React.JSX.IntrinsicElements>) {
  return (
    <Headless.Combobox
      as={as}
      className={cn(
        "group overflow-hidden rounded-md bg-white text-gray-950 dark:bg-gray-950 dark:text-gray-50",
        className
      )}
      {...props}
    />
  );
}

function CommandInput({ className, ...props }: Headless.ComboboxInputProps) {
  return (
    <div className="relative">
      <Headless.ComboboxButton
        className={"group absolute inset-y-0 left-0 px-2.5"}
      >
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      </Headless.ComboboxButton>
      <Headless.ComboboxInput
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 pl-8 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  children,
  empty = "No results found",
  ...props
}: Headless.ComboboxOptionsProps & {
  empty?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <ScrollArea>
      <Headless.ComboboxOptions
        transition
        anchor={{
          to: "bottom",
          gap: 5,
        }}
        className={cn(
          "max-h-[300px] w-[var(--input-width)] rounded-md border bg-white text-sm/6 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0",
          className
        )}
        {...props}
      >
        {children}
        <CommandEmpty>{empty}</CommandEmpty>
      </Headless.ComboboxOptions>
    </ScrollArea>
  );
}

function CommandEmpty({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="py-6 text-center text-sm peer-has-[[data-option]]:hidden"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  children,
  heading,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  heading?: string;
}) {
  return (
    <div
      className={cn(
        "peer hidden overflow-hidden p-1 text-gray-950 has-[[data-option]]:block dark:text-gray-50",
        className
      )}
      {...props}
    >
      <p
        className={cn(
          "px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400",
          !heading && "hidden",
          className
        )}
      >
        {heading}
      </p>
      {children}
    </div>
  );
}

function CommandItem({ className, ...props }: Headless.ComboboxOptionProps) {
  return (
    <Headless.ComboboxOption
      data-option=""
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[disabled]:opacity-50 dark:data-[focus]:bg-gray-800 dark:data-[focus]:text-gray-50",
        className
      )}
      {...props}
    />
  );
}
function CommandSeparator({ className, ...props }: SeparatorProps) {
  return (
    <Separator
      className={cn(
        "-mx-1 my-2 hidden h-px bg-gray-200 peer-data-[filled]:block dark:bg-gray-800",
        className
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-gray-500 dark:text-gray-400",
        className
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
