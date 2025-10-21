"use client";

import { useTaskFilters } from "@/lib/hooks/util";
import { useFindMyTasksByWorkspaceId } from "@/lib/query";
import { TaskFilterOptions } from "@/lib/types";
import TaskViewSwitcher from "../../task-view-switcher";

interface Props {
  workspaceId: string;
  userId?: string;
}

export default function WorkspaceSwitcher({ workspaceId, userId }: Props) {
  const [{ status, priority, dueDate, startDate, search, projectId }] =
    useTaskFilters();

  const filterOptions: TaskFilterOptions = {
    status: status || undefined,
    priority: priority || undefined,
    projectId: projectId || undefined,
    search: search || undefined,
    startDate: startDate || undefined,
    dueDate: dueDate || undefined,
  };
  const { data: tasks } = useFindMyTasksByWorkspaceId(
    workspaceId,
    userId,
    filterOptions
  );
  return (
    <TaskViewSwitcher
      workspaceId={workspaceId}
      userId={userId}
      tasks={tasks}
      type={"workspace"}
    />
  );
}
