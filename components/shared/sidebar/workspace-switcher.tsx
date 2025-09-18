"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WorkspaceAvatar from "@/components/workspace/workspace-avatar";
import { useParameters } from "@/lib/hooks/util";
import { useFindWorkspace } from "@/lib/query";
import { useOpenWorkspaceDialogStore } from "@/lib/stores";
import { Workspace } from "@/lib/types";
import { useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export default function WorkspaceSwitcher() {
  const { onOpen } = useOpenWorkspaceDialogStore();
  const { workspaceId } = useParameters();
  const { data } = useFindWorkspace();
  const router = useRouter();
  const workspaces: Workspace[] = data || [];

  function onSelect(workspaceId: string) {
    router.push(`/workspaces/${workspaceId}`);
  }

  return (
    <div className="flex flex-col gap-y-2 px-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-500">워크스페이스</p>
        <RiAddCircleFill
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          onClick={onOpen}
        />
      </div>
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger
          className="w-full bg-neutral-200 font-medium py-3 px-2 h-14"
          suppressHydrationWarning
        >
          <SelectValue placeholder="워크스페이스 선택" className="truncate" />
        </SelectTrigger>
        <SelectContent className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)]">
          {workspaces.map((workspace) => (
            <SelectItem
              key={workspace.id}
              value={workspace.id}
              className="px-2"
            >
              <div className="flex justify-start items-center gap-2 font-medium w-full min-w-0">
                <WorkspaceAvatar
                  name={workspace.name}
                  image={workspace.image}
                  className="shrink-0"
                />
                <span className="truncate text-sm">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
