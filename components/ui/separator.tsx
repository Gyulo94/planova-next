"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  );
}

function DottedSeparator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 border-dotted border-4 border-border data-[orientation=horizontal]:border-t-4 data-[orientation=horizontal]:border-x-0 data-[orientation=horizontal]:border-b-0 data-[orientation=horizontal]:h-0 data-[orientation=horizontal]:w-full data-[orientation=vertical]:border-l-4 data-[orientation=vertical]:border-y-0 data-[orientation=vertical]:border-r-0 data-[orientation=vertical]:w-0 data-[orientation=vertical]:h-full",
        className
      )}
      {...props}
    />
  );
}

export { DottedSeparator, Separator };
