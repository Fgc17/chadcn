import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

const alph = (index: number) => String.fromCharCode(97 + index);
const Alph = (index: number) => String.fromCharCode(65 + index);
const roman = (index: number) => toRoman(index + 1).toLowerCase();
const Roman = (index: number) => toRoman(index + 1);
const toRoman = (num: number): string => {
  const romanNumerals: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, numeral] of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
};

function Task({
  children,
  label,
  colSpan,
  index,
}: {
  children: React.ReactNode;
  label?: React.ReactNode | ((index: number) => React.ReactNode);
  colSpan?: number;
  index?: number;
}) {
  return (
    <li
      style={{
        gridColumn: colSpan ? `span ${colSpan} / span ${colSpan}` : undefined,
      }}
      className="mt-2"
    >
      <span className="mr-2">
        {typeof label === "function" ? label(index!) : (label ?? "•")}
      </span>
      {children}
    </li>
  );
}

function Tasks({
  children,
  columns = 2,
  className,
  label,
  ...props
}: {
  children: React.ReactNode;
  columns?: number;
  label?: React.ReactNode | ((index: number) => React.ReactNode);
} & React.HTMLAttributes<HTMLUListElement>) {
  const gridColumnsClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[columns] || "grid-cols-2";

  return (
    <ul
      className={cn(
        "my-6 ml-6 grid list-none gap-x-4",
        gridColumnsClass,
        className
      )}
      style={{ listStyleType: "none" }}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <Slot {...{ label, index }}>{child}</Slot>
      ))}
    </ul>
  );
}

export { Task, Tasks, alph, Alph, roman, Roman };
