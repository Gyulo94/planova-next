"use client";

import { useTitleAndDescription } from "@/lib/hooks/util";

export default function NavTitle() {
  const { title, description } = useTitleAndDescription();

  return (
    <div className="flex-col hidden md:flex">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
