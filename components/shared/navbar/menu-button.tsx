"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { LOGO } from "@/lib/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MenuButton() {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  if (isMobile) {
    if (!pathname.includes("profile")) {
      return <SidebarTrigger className="border-none" />;
    }
  } else {
    if (pathname.includes("profile")) {
      return (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <Image
            src={LOGO}
            alt={LOGO}
            width={26}
            height={26}
            className="object-cover object-center"
          />
        </div>
      );
    }
  }
}
