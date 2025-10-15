import { TaskStatus } from "@/lib/constants";
import { useParameters } from "@/lib/hooks/util";
import { useFindWorkspaceMembers } from "@/lib/query";
import { useOpenTaskDialogStore, useWorkspaceMembers } from "@/lib/stores";
import { StatusTypes } from "@/lib/validations";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import z from "zod/v3";
import { Button } from "../../ui/button";

interface Props {
  status: {
    color: string;
    label: string;
    value: string;
  };
  taskCount: number;
}

const statusIconMap: Record<z.infer<typeof StatusTypes>, ReactNode> = {
  [TaskStatus[0].value]: (
    <CircleDashedIcon className="size-[18px] text-gray-600" />
  ),
  [TaskStatus[1].value]: <CircleIcon className="size-[18px] text-blue-600" />,
  [TaskStatus[2].value]: (
    <CircleDotDashedIcon className="size-[18px] text-amber-600" />
  ),
  [TaskStatus[3].value]: (
    <CircleDotIcon className="size-[18px] text-indigo-600" />
  ),
  [TaskStatus[4].value]: (
    <CircleCheckIcon className="size-[18px] text-green-600" />
  ),
};

export default function KanbanColumnHeader({ status, taskCount }: Props) {
  const { data: session } = useSession();
  const { onOpen } = useOpenTaskDialogStore();
  const { workspaceId, projectId } = useParameters();
  const { data: workspaceMembers } = useFindWorkspaceMembers(workspaceId);
  const { setMembers, setIsAdmin } = useWorkspaceMembers();
  const statusIcon = statusIconMap[status.value as z.infer<typeof StatusTypes>];
  const userId = session?.user.id;
  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {statusIcon}
        <h2>{status.label}</h2>
        <div className="size-5 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-xs font-medium">
          {taskCount}
        </div>
      </div>
      <Button
        onClick={() => {
          setMembers(workspaceMembers.members || []);
          setIsAdmin(userId!);
          onOpen(projectId, workspaceId);
        }}
        variant="ghost"
        size="icon"
        className="size-5"
      >
        <PlusIcon className="size-4 text-neutral-500" />
      </Button>
    </div>
  );
}
