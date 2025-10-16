"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/ui/separator";
import UserAvatar from "@/components/user/user-avatar";
import { TaskPriority, TaskStatus } from "@/lib/constants";
import { useFindWorkspaceMembers } from "@/lib/query";
import { useEditTaskDialogStore, useWorkspaceMembers } from "@/lib/stores";
import { Task } from "@/lib/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { PencilIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import TaskDate from "../task-date";
import OverviewProperty from "./overview-property";

interface Props {
  task: Task;
  workspaceId: string;
}

export default function TaskOverview({ task, workspaceId }: Props) {
  const { onOpen } = useEditTaskDialogStore();
  const { data: workspaceMembers } = useFindWorkspaceMembers(workspaceId);
  const { setMembers, setIsAdmin } = useWorkspaceMembers();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const statusLabel = TaskStatus.find((s) => s.value === task.status)?.label;
  const priorityLabel = TaskPriority.find(
    (p) => p.value === task.priority
  )?.label;
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-background rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">오버뷰</p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setMembers(workspaceMembers.members || []);
              setIsAdmin(userId!);
              onOpen(task.id, task.project.id);
            }}
          >
            <PencilIcon className="size-4 mr-2" />
            수정
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="담당자">
            <UserAvatar name={task.assignee.name} url={task.assignee.image} />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="시작일">
            <p className="text-sm font-medium">
              {format(task.startDate, "PPP", { locale: ko })}
            </p>
          </OverviewProperty>
          <OverviewProperty label="마감일">
            <TaskDate
              value={task.dueDate.toString()}
              className="text-sm font-medium"
              dateFormat="PPP"
            />
          </OverviewProperty>
          <OverviewProperty label="상태">
            <Badge variant={task.status}>{statusLabel}</Badge>
          </OverviewProperty>
          <OverviewProperty label="우선순위">
            <Badge variant={task.priority}>{priorityLabel}</Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
}
