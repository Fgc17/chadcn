"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../floating/popover";
import { useMediaQuery } from "chadcn/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "../floating/drawer";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Button } from "../button";
import { ReactNode } from "react";
import { ChevronsUpDown, XIcon } from "lucide-react";
import { Overlay } from "./overlay";
import { cn } from "chadcn/lib/utils";
import { useParentForm } from "./form";
import _, { isArray } from "lodash";
import { Badge } from "../badge";
import { For } from "../for";
import { useController } from "react-hook-form";
import { useField } from "./field";

type SelectProps<
  Option extends Record<keyof any, ReactNode>,
  Multiple extends boolean,
> = Omit<React.ComponentProps<typeof Command<Option, Multiple>>, "children"> & {
  placeholder: ReactNode;
  options: Option[];
  children: (item: Option) => ReactNode;
  className?: string;
  labelBy: keyof Option;
} & (
    | {
        searchable: true;
        onSearch?: (query: string) => void;
      }
    | {
        searchable?: false;
        onSearch?: never;
      }
  );

export function PrimitiveSelect<
  Option extends Record<keyof any, ReactNode>,
  Multiple extends boolean,
>({
  children,
  searchable,
  placeholder,
  onSearch,
  options,
  labelBy = "id" as any,
  onChange,
  value,
  ...props
}: SelectProps<Option, Multiple>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<typeof value>();

  const Floating = isDesktop ? Popover : Drawer;
  const FloatingTrigger = isDesktop ? PopoverTrigger : DrawerTrigger;
  const FloatingContent = isDesktop ? PopoverContent : DrawerContent;

  const display = (selected: Option) => {
    if (isArray(selected)) {
      return (
        <For each={selected}>
          {(s) => (
            <Badge
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelected(selected.filter((o) => o !== s) as typeof value);
              }}
              className="mb-2"
            >
              {s[labelBy] ?? placeholder}
              <XIcon className="size-2" />
            </Badge>
          )}
        </For>
      );
    }

    return (
      <p className="mb-2">
        {_.isEmpty(selected) ? placeholder : (selected as Option)[labelBy]}
      </p>
    );
  };

  React.useEffect(() => {
    selected && onChange?.(selected);
    !props.multiple && setOpen(false);
  }, [selected]);

  return (
    <Command
      {...props}
      as={React.Fragment}
      value={selected}
      onChange={(v) => setSelected(v as typeof value)}
    >
      {({ value }) => (
        <Floating open={open} onOpenChange={setOpen}>
          <Overlay variant={"select"}>
            <FloatingTrigger ref={triggerRef} asChild>
              <Button
                variant="outline"
                size="variable"
                className={cn(
                  "flex min-h-10 w-full justify-between text-wrap px-3 py-2 font-normal",
                  "has-[[data-invalid]]:border-red-500 has-[[data-invalid]]:text-red-600 group-data-[invalid]:border-red-500 group-data-[invalid]:text-red-600"
                )}
              >
                <div className={cn("-mb-2 space-x-2")}>{display(value)}</div>

                <div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </div>
              </Button>
            </FloatingTrigger>
          </Overlay>
          <FloatingContent
            className="p-0"
            style={{
              width: isDesktop ? triggerRef.current?.offsetWidth : undefined,
            }}
          >
            <div className={cn(!isDesktop && "mt-4 border-t")}>
              <div
                className={cn(
                  !searchable && "pointer-events-none invisible fixed w-full"
                )}
              >
                <CommandInput
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    onSearch?.(e.target.value);
                  }}
                  displayValue={() => query}
                  className={"rounded-none group-data-[state=open]:border-b"}
                />
              </div>
              <div className="min-h-max">
                <CommandList
                  className="border-none"
                  transition={undefined}
                  anchor={undefined}
                  static
                >
                  <CommandGroup>
                    <For each={options}>
                      {(option, index) => (
                        <CommandItem key={index} value={option}>
                          {({ selected }) => (
                            <>
                              {props.multiple && selected && (
                                <XIcon className="h-4 w-4" />
                              )}
                              {children(option)}
                            </>
                          )}
                        </CommandItem>
                      )}
                    </For>
                  </CommandGroup>
                </CommandList>
              </div>
            </div>
          </FloatingContent>
        </Floating>
      )}
    </Command>
  );
}

export function Select<
  Option extends Record<keyof any, ReactNode>,
  Multiple extends boolean,
>({ onChange, ...props }: SelectProps<Option, Multiple>) {
  const { control } = useParentForm();

  const { name } = useField();

  const {
    field: { value, onChange: setValue, ...field },
  } = useController({
    control: control,
    name,
  });

  return (
    <PrimitiveSelect
      {...props}
      {...field}
      value={value}
      onChange={(v) => {
        if (props.by) {
          const by = props.by;
          return setValue(
            isArray(v)
              ? v.map((o) => (o as typeof value)?.[by])
              : (v as typeof value)?.[by]
          );
        }

        return setValue(v);
      }}
    />
  );
}
