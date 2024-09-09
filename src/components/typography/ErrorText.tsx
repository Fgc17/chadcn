import clsx from "clsx";

export function ErrorText({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={clsx(
        className,
        "text-xs text-red-600 data-[disabled]:opacity-50"
      )}
    >
      {children}
    </span>
  );
}
