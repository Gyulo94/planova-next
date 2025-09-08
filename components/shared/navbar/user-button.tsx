"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/ui/separator";
import UserAvatar from "@/components/user/user-avatar";
import { DEFAULT_AVATAR } from "@/lib/constants";
import { useLogout } from "@/lib/query";
import { LogOutIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserButton() {
  const { data: session, status } = useSession();
  const { mutate: logout } = useLogout();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      {status === "authenticated" && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <UserAvatar
              url={session?.user.image || DEFAULT_AVATAR}
              name={session?.user.name!}
              isTooltipEnabled={false}
              className="cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60" sideOffset={10}>
            <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
              <UserAvatar
                url={session?.user.image || DEFAULT_AVATAR}
                name={session?.user.name!}
                isTooltipEnabled={false}
                className="size-14 border border-neutral-300"
              />
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-sm font-medium text-neutral-900">
                  {session?.user.name}
                </h2>
                <p className="text-xs text-neutral-500">
                  {session?.user.email}
                </p>
              </div>
            </div>
            <DottedSeparator className="mb-1" />
            <DropdownMenuItem
              className="h-10 flex items-center justify-center font-medium"
              onClick={() => logout()}
            >
              <LogOutIcon className="size-4 mr-2" /> 로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
