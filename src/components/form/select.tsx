"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../floating/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "../floating/drawer";
import {
  Command,
  CommandOptionGroup,
  CommandInput,
  CommandOption,
  CommandOptions,
} from "../command";
import { Button, ButtonProps } from "../button";
import { ReactNode } from "react";
import { ChevronsUpDown, XIcon } from "lucide-react";
import { Overlay } from "./overlay";
import * as Headless from "@headlessui/react";
import { Badge } from "../badge";
import { cn } from "@/lib/utils";
import { Control } from "./form";

const SelectContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  multiple: boolean;
} | null>(null);

type SelectProps<
  T,
  Multiple extends boolean | undefined,
> = Headless.CommandProps<T, Multiple, "input"> & {
  emptyState?: ReactNode;
  searchable?: boolean;
  onSearch?: (query: string) => void;
  items?: string[];
  children: (item: string) => ReactNode;
  multiple?: Multiple;
};

export const SelectOption = CommandOption;

export function SelectTrigger({
  children,
  placeholder,
  ...props
}: ButtonProps & {
  placeholder: ReactNode;
}) {
  const context = React.useContext(SelectContext);

  if (!context) return null;

  const { selected } = context;

  const displayValue = Array.isArray(selected) ? (
    selected.map((s) => (
      <Badge
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          context.setSelected((prev: any[]) => prev.filter((i) => i !== s));
        }}
        className="mb-2"
      >
        {s}
        <XIcon className="size-2" />
      </Badge>
    ))
  ) : (
    <p className="mb-2">{selected}</p>
  );

  return (
    <Button
      variant="outline"
      size="variable"
      className={cn(
        "flex w-full justify-between text-wrap",

        "has-[[data-invalid]]:border-red-500 has-[[data-invalid]]:text-red-600 group-data-[invalid]:border-red-500 group-data-[invalid]:text-red-600"
      )}
      {...props}
    >
      <div className={cn("-mb-2 space-x-2")}>
        {selected ? displayValue : <p className="mb-2">{placeholder}</p>}
      </div>
      <div>
        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
      </div>
    </Button>
  );
}

export function SelectContent<T, Multiple extends boolean | undefined>({
  items = [],
  children,
  onSearch,
  onChange,
  searchable,
  ...props
}: SelectProps<T, Multiple>) {
  const context = React.useContext(SelectContext);

  if (!context) return null;

  const { setOpen, query, setQuery, selected, setSelected, multiple } = context;

  const handleSelect = (item: string) => {
    if (multiple) {
      setSelected((prev: any[]) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    } else {
      setSelected(item);
      setOpen(false);
    }
  };

  return (
    <Command {...props} as="div" onChange={(e) => onChange?.(selected || e)}>
      {searchable && (
        <CommandInput
          value={query}
          onChange={(e) => {
            setQuery(() => {
              return e.target.value;
            });
            onSearch?.(e.target.value as any);
          }}
          displayValue={() => query}
        />
      )}
      <div className="min-h-max">
        <CommandOptions static>
          <CommandOptionGroup>
            {items.map((option) => (
              <SelectOption
                key={option}
                value={option}
                onClick={() => handleSelect(option)}
              >
                {multiple && selected?.includes(option) && (
                  <XIcon className="h-4 w-4" />
                )}
                {children(option)}
              </SelectOption>
            ))}
          </CommandOptionGroup>
        </CommandOptions>
      </div>
    </Command>
  );
}

export function PrimitiveSelect<T, Multiple extends boolean | undefined>({
  items = [],
  children,
  multiple = false,
  ...props
}: SelectProps<T, Multiple>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState(multiple ? [] : null);

  const contextValue = {
    open,
    setOpen,
    query,
    setQuery,
    selected,
    setSelected,
    multiple,
  };

  return (
    <SelectContext.Provider value={contextValue}>
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <Overlay variant={"select"}>
            <PopoverTrigger ref={triggerRef} asChild>
              <SelectTrigger placeholder={props.placeholder} />
            </PopoverTrigger>
          </Overlay>
          <PopoverContent
            className="p-0"
            style={{
              width: triggerRef.current?.offsetWidth,
            }}
          >
            <SelectContent {...props} items={items}>
              {children}
            </SelectContent>
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild ref={triggerRef}>
            <SelectTrigger placeholder={props.placeholder} />
          </DrawerTrigger>
          <DrawerContent className="p-0">
            <div className="mt-4 border-t">
              <SelectContent {...props} items={items}>
                {children}
              </SelectContent>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </SelectContext.Provider>
  );
}

export function Select<T, Multiple extends boolean | undefined>({
  onChange,
  ...props
}: SelectProps<T, Multiple>) {
  return (
    <Control>
      {({ field: { onChange: fieldOnChange, value, ref, ...field } }) => (
        <PrimitiveSelect
          value={value || ""}
          onChange={(v) => {
            console.log(v);
            fieldOnChange(v);
            onChange?.(v);
          }}
          {...props}
          {...field}
        />
      )}
    </Control>
  );
}
