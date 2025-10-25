"use client";

import { useTitleAndDescription } from "@/lib/hooks/util";
import { usePathname } from "next/navigation";

export default function NavTitle() {
  const { title } = useTitleAndDescription();
  const pathname = usePathname();

  return (
    <div className="flex-col hidden md:flex">
      {!pathname.includes("profile") && (
        <h1 className="text-2xl font-semibold">{title}</h1>
      )}
    </div>
  );
}
