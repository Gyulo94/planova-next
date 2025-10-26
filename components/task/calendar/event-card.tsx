import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/user/user-avatar";
import { TaskPriority, TaskStatus } from "@/lib/constants";
import { useParameters } from "@/lib/hooks/util";
import { cn } from "@/lib/utils";
import { PriorityTypes, StatusTypes } from "@/lib/validations";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import z from "zod/v3";

interface Props {
  id: string;
  title: string;
  assignee: Session["user"];
  status: z.infer<typeof StatusTypes>;
  priority: z.infer<typeof PriorityTypes>;
}

const statusColorMap: Record<z.infer<typeof StatusTypes>, string> = {
  [TaskStatus[0].value]: "border-l-gray-600",
  [TaskStatus[1].value]: "border-l-blue-600",
  [TaskStatus[2].value]: "border-l-amber-600",
  [TaskStatus[3].value]: "border-l-indigo-600",
  [TaskStatus[4].value]: "border-l-green-600",
};

export default function EventCard({
  id,
  title,
  assignee,
  status,
  priority,
}: Props) {
  const priorityLabel = TaskPriority.find((s) => s.value === priority)?.label;
  const { workspaceId } = useParameters();
  const router = useRouter();

  function onClick() {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  }

  return (
    <div className="px-2">
      <div
        data-event-card
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-accent text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition z-100",
          statusColorMap[status]
        )}
      >
        <p>{title}</p>
        <div className="flex items-center justify-between">
          <UserAvatar name={assignee.name} url={assignee.image} size="sm" />
          <div className="size-1 rounded-full bg-neutral-300" />
          <Badge variant={priority}>{priorityLabel}</Badge>
        </div>
      </div>
    </div>
  );
}
