"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function MenuButton() {
  const { isMobile } = useSidebar();
  if (isMobile) {
    return <SidebarTrigger className="border-none" />;
  }
}
