import React, { Fragment } from "react";

interface ForProps<T> {
  each: T[];
  children: (item: T, index: number) => React.ReactNode;
  identifier?: string;
  fallback?: React.ReactNode;
}

export function For<T>({ each, children, identifier, fallback }: ForProps<T>) {
  if (!each || each?.length < 1) return fallback;

  if (!identifier)
    return (
      <>
        {each.map((element, index) => (
          <Fragment key={index}>{children(element, index)}</Fragment>
        ))}
      </>
    );

  return (
    <>
      {each.map((element, index) => (
        <Fragment key={identifier + index}>{children(element, index)}</Fragment>
      ))}
    </>
  );
}
