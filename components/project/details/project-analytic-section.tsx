"use client";

import Analytics from "@/components/ui/analytics";
import { useFindTaskCountsByProjectId } from "@/lib/query";
import { TotalTaskCounts } from "@/lib/types";

interface Props {
  projectId: string;
}

export default function ProjectAnalyticSection({ projectId }: Props) {
  const { data } = useFindTaskCountsByProjectId(projectId);
  const taskCounts: TotalTaskCounts = data;
  return <Analytics data={taskCounts} />;
}
