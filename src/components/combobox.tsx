"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "./drawer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Button } from "./button";
import { ReactNode } from "react";

const ComboboxContext = React.createContext<{
  values: string[];
  toggleOpen: () => void;
  selectedValue: string;
  setSelectedValue: (item: string | null) => void;
  mapBy?: string;
}>(null!);

const useParentCombobox = () => React.useContext(ComboboxContext);

type ComboboxProps = {
  children: ReactNode;
  placeholder: ReactNode;
  emptyState?: ReactNode;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
};

export function Combobox(props: ComboboxProps & {}) {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = React.useCallback(() => setOpen((open) => !open), []);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [selectedValue, setSelectedValue] = React.useState<any>(null);

  const Items = React.Children.toArray(props.children).filter(
    (i) => !React.isValidElement(i) || i.type !== ComboboxItem
  ) as React.JSX.Element[];

  const values = Items.map((item) => item.props.value);

  const SelectedItem = Items.find((i) => i.props.value === selectedValue)!;

  if (isDesktop) {
    return (
      <ComboboxContext.Provider
        value={{
          toggleOpen,
          values,
          setSelectedValue,
          selectedValue,
        }}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              {selectedValue ? SelectedItem?.props.children : props.placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <ComboboxPopover {...props} />
          </PopoverContent>
        </Popover>
      </ComboboxContext.Provider>
    );
  }

  return (
    <ComboboxContext.Provider
      value={{
        toggleOpen,
        values,
        setSelectedValue,
        selectedValue,
      }}
    >
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedValue ? SelectedItem.props.children : props.placeholder}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <ComboboxPopover {...props} />
          </div>
        </DrawerContent>
      </Drawer>
    </ComboboxContext.Provider>
  );
}

export function ComboboxItem(props: { value: string; children: ReactNode }) {
  const { toggleOpen, setSelectedValue } = useParentCombobox();

  return (
    <CommandItem
      key={props.value}
      value={props.value}
      onSelect={(value) => {
        setSelectedValue(value);
        toggleOpen();
      }}
    >
      {props.children}
    </CommandItem>
  );
}

function ComboboxPopover({
  children,
  emptyState,
  searchPlaceholder,
  onSearch,
}: ComboboxProps) {
  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder={searchPlaceholder}
        onInput={(e) => onSearch && onSearch(e.currentTarget.value)}
      />
      <CommandList>
        <CommandEmpty>{emptyState}</CommandEmpty>
        <CommandGroup>{children}</CommandGroup>
      </CommandList>
    </Command>
  );
}
