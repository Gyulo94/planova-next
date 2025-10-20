"use client"

import { useTaskFilters } from "@/lib/hooks/util";
import { useFindTasksByProjectId } from "@/lib/query";
import { TaskFilterOptions } from "@/lib/types";
import TaskViewSwitcher from "../../task-view-switcher";

interface Props {
  workspaceId: string;
  projectId: string;
  userId?: string;
}

export default function ProjectSwitcher({
  workspaceId,
  projectId,
  userId,
}: Props) {
  const [{ status, assigneeId, priority, dueDate, startDate, search }] =
    useTaskFilters();

  const filterOptions: TaskFilterOptions = {
    status: status || undefined,
    priority: priority || undefined,
    assigneeId: assigneeId || undefined,
    search: search || undefined,
    startDate: startDate || undefined,
    dueDate: dueDate || undefined,
  };
  const { data: tasks } = useFindTasksByProjectId(projectId, filterOptions);

  return (
    <TaskViewSwitcher
      workspaceId={workspaceId}
      projectId={projectId}
      userId={userId}
      tasks={tasks}
      type={"project"}
    />
  );
}
