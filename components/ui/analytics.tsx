import { TotalTaskCounts } from "@/lib/types";
import AnalyticsCard from "./analytics-card";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { DottedSeparator } from "./separator";

interface Props {
  data: TotalTaskCounts;
}

export default function Analytics({ data }: Props) {
  return (
    <ScrollArea className="rounded-lg w-full whitespace-nowrap shrink-0 mb-1">
      <div className="hidden w-full lg:flex lg:flex-row">
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title={"총 작업수"}
            value={data.totalCount.total ?? 0}
            variant={data.totalCount.difference > 0 ? "UP" : "DOWN"}
            increaseValue={data.totalCount.difference}
          />
        </div>
        <DottedSeparator orientation="vertical" />
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title={"생성된 작업수"}
            value={data.assignedCount.total ?? 0}
            variant={data.assignedCount.difference > 0 ? "UP" : "DOWN"}
            increaseValue={data.assignedCount.difference}
          />
        </div>
        <DottedSeparator orientation="vertical" />
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title={"미완료 작업수"}
            value={data.incompleteCount.total ?? 0}
            variant={data.incompleteCount.difference > 0 ? "UP" : "DOWN"}
            increaseValue={data.incompleteCount.difference}
          />
        </div>
        <DottedSeparator orientation="vertical" />
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title={"완료된 작업수"}
            value={data.completedCount.total ?? 0}
            variant={data.completedCount.difference > 0 ? "UP" : "DOWN"}
            increaseValue={data.completedCount.difference}
          />
        </div>
        <DottedSeparator orientation="vertical" />
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title={"만료된 작업수"}
            value={data.overdueCount.total ?? 0}
            variant={data.overdueCount.difference > 0 ? "UP" : "DOWN"}
            increaseValue={data.overdueCount.difference}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
