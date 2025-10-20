"use client";

import Analytics from "@/components/ui/analytics";
import { useFindTaskCountsByWorkspaceId } from "@/lib/query";
import { TotalTaskCounts } from "@/lib/types";

interface Props {
  workspaceId: string;
  userId?: string;
}

export default function WorkspaceAnalyticSection({
  workspaceId,
  userId,
}: Props) {
  const { data } = useFindTaskCountsByWorkspaceId(workspaceId, userId);
  const taskCounts: TotalTaskCounts = data || {
    totalCount: 0,
    completedCount: 0,
    incompleteCount: 0,
    assignedCount: 0,
    overdueCount: 0,
  };
  return <Analytics data={taskCounts} />;
}
