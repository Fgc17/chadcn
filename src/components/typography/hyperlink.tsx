import { cn } from "@/lib/utils";
import { Link } from "../navigation/link";

export function Hyperlink({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "-[hover]:decoration-white text-zinc-950 underline decoration-zinc-950/50 data-[hover]:decoration-zinc-950",
        className
      )}
    />
  );
}
