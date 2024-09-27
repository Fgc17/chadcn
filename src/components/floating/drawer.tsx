"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cn } from "chadcn/lib/utils";
import { ScrollArea } from "../wireframe/scroll-area";

function Drawer({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root
      repositionInputs={false}
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  );
}

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  const childrenArray = React.Children.toArray(children);

  const hasFooter = childrenArray.length > 1;
  const footer = hasFooter ? childrenArray[childrenArray.length - 1] : null;
  const content = hasFooter ? childrenArray.slice(0, -1) : childrenArray;

  return (
    <DrawerPortal>
      <DrawerOverlay />

      <DrawerPrimitive.Content
        onOpenAutoFocus={(e) => e.preventDefault()}
        aria-describedby={undefined}
        className={cn(
          "group fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
        )}
        {...props}
      >
        <VisuallyHidden.Root>
          <DrawerTitle>Hidden</DrawerTitle>
        </VisuallyHidden.Root>
        <div className="mx-auto my-2 mt-4 h-2 w-[100px] rounded-full bg-gray-100 dark:bg-gray-800" />
        <ScrollArea>
          <div className={cn("max-h-[500px] p-4", className)}>{content}</div>
        </ScrollArea>
        {footer && <div className={cn("p-4 pt-0", className)}>{footer}</div>}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-1.5 py-6 text-left", className)} {...props} />
  );
}

function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 pt-6", className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
