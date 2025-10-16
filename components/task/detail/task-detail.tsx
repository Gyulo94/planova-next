"use client";

import { DottedSeparator } from "@/components/ui/separator";
import { useFindTaskById } from "@/lib/query";
import TaskBreadcrumbs from "./task-breadcrumbs";
import TeskDescription from "./task-description";
import TaskOverview from "./task-overview";

interface Props {
  taskId: string;
  workspaceId: string;
}

export default function TaskDetail({ taskId, workspaceId }: Props) {
  const { data: task } = useFindTaskById(taskId);

  return (
    <div>
      <TaskBreadcrumbs task={task} workspaceId={workspaceId} />
      <DottedSeparator className="my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview task={task} workspaceId={workspaceId} />
        <TeskDescription task={task} />
      </div>
    </div>
  );
}
