"use client";

import Analytics from "@/components/ui/analytics";
import { useFindTaskCountsById } from "@/lib/query";
import { TotalTaskCounts } from "@/lib/types";

interface Props {
  projectId: string;
}

export default function ProjectAnalyticSection({ projectId }: Props) {
  const { data } = useFindTaskCountsById(projectId);
  const taskCounts: TotalTaskCounts = data;
  return <Analytics data={taskCounts} />;
}
