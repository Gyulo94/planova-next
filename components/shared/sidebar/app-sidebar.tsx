import { DottedSeparator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { LOGO } from "@/lib/constants";
import Image from "next/image";
import Navigation from "./navigation";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Image
            src={LOGO}
            alt={LOGO}
            width={26}
            height={26}
            className="object-cover object-center"
          />
          <SidebarGroupLabel>
            <h1 className="text-3xl font-bold dark:text-white">PLANOVA</h1>
          </SidebarGroupLabel>
        </div>
      </SidebarHeader>
      <DottedSeparator className="mb-4" />
      <SidebarContent>
        <Navigation />
      </SidebarContent>
    </Sidebar>
  );
}
