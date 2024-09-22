import NextLink, { type LinkProps } from "next/link";
import React from "react";

export function Link(props: LinkProps & React.ComponentProps<"a">) {
  return <NextLink {...props} />;
}
