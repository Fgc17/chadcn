"use client";

import * as Headless from "@headlessui/react";

import { cn } from "chadcn/lib/utils";

const Tabs = Headless.TabGroup;
const TabPanels = Headless.TabPanels;

function TabList({ className, ...props }: Headless.TabListProps) {
  return (
    <Headless.TabList
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
        className
      )}
      {...props}
    />
  );
}

function Tab({ className, ...props }: Headless.TabProps) {
  return (
    <Headless.Tab
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-white data-[selected]:text-gray-950 data-[selected]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[selected]:bg-gray-950 dark:data-[selected]:text-gray-50",
        className
      )}
      {...props}
    />
  );
}

function TabPanel({ className, ...props }: Headless.TabPanelProps) {
  return (
    <Headless.TabPanel
      className={cn(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabList, Tab, TabPanel, TabPanels };
