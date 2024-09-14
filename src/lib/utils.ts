import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type BagChildren<T> = Omit<T, "children"> & {
  children?: React.ReactNode;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
