import { icons } from "lucide-react";
import React from "react";

const Icon = ({
  name,
  ...props
}: React.HTMLAttributes<SVGElement> & {
  name: keyof typeof icons;
}) => {
  const LucideIcon = icons[name];

  return <LucideIcon data-slot="icon" {...props} />;
};

export { Icon };
