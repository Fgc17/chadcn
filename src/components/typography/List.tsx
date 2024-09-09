import clsx from "clsx";
import { ReactNode } from "react";

export function List({
  data,
  className,
}: {
  data: string;
  className?: string;
}) {
  const parsedData = JSON.parse(data as string);

  return (
    <ul role="list" className={clsx("list-disc", className)}>
      {(Array.isArray(parsedData) ? parsedData : [parsedData]).map(
        (element: ReactNode, index: number) => (
          <li key={index}>{element}</li>
        )
      )}
    </ul>
  );
}
