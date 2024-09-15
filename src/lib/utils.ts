import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type BagChildren<T> = Omit<T, "children"> & {
  children?: React.ReactNode;
};

export interface MapObject<Props extends { [key: string]: any }> {
  get<K extends keyof Props>(key: K): Props[K];

  set<K extends keyof Props>(key: K, value: Props[K]): this;

  delete<K extends keyof Props>(key: K): boolean;

  has<K extends keyof Props>(key: K): boolean;

  forEach(
    callbackfn: (
      value: Props[keyof Props],
      key: keyof Props,
      map: MapObject<Props>
    ) => void,
    thisArg?: any
  ): void;

  entries(): IterableIterator<[keyof Props, Props[keyof Props]]>;

  keys(): IterableIterator<keyof Props>;

  values(): IterableIterator<Props[keyof Props]>;

  [Symbol.iterator](): IterableIterator<[keyof Props, Props[keyof Props]]>;

  get size(): number;

  clear(): void;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
