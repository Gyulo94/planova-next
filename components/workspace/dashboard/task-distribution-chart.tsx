// ...existing code...
"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TotalTaskCounts } from "@/lib/types";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

interface Props {
  counts: TotalTaskCounts;
}

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  inProgress: {
    label: "In Progress",
  },
  overdue: {
    label: "Overdue",
  },
  backlog: {
    label: "Backlog",
  },
  blocked: {
    label: "Blocked",
  },
  inReview: {
    label: "In Review",
  },
  todo: {
    label: "Todo",
  },
} satisfies ChartConfig;

export default function TaskDistributionChart({ counts }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = counts.totalCount?.total ?? 0;

  const data = [
    { name: "완료", value: counts.completedCount.total, fill: "#22c55e" },
    { name: "진행 중", value: counts.inProgressCount?.total, fill: "#f59e0b" },
    { name: "지연됨", value: counts.overdueCount.total, fill: "#ef4444" },
    { name: "백로그", value: counts.backlogCount?.total, fill: "#6b7280" },
    { name: "검토 중", value: counts.inReviewCount?.total, fill: "#6366f1" },
    {
      name: "할 일",
      value: counts.todoCount?.total,
      fill: "#3b82f6",
    },
  ].filter((entry) => entry.value && entry.value > 0);

  return (
    <Card className="flex flex-col p-4">
      <h3 className="text-lg font-semibold mb-4">총 작업 수</h3>
      <CardContent className="flex-1 pb-0">
        {mounted ? (
          total > 0 ? (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={data}
                  dataKey={"value"}
                  nameKey={"name"}
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {counts.totalCount?.total.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              작업
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="mx-auto aspect-square max-h-[250px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-medium text-muted-foreground">
                  작업이 없습니다
                </div>
                <div className="text-sm text-muted-foreground">
                  새 작업을 추가해보세요
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="mx-auto aspect-square max-h-[250px] flex items-center justify-center">
            {total === 0 ? (
              <div className="text-center">
                <div className="text-lg font-medium text-muted-foreground">
                  작업이 없습니다
                </div>
                <div className="text-sm text-muted-foreground">
                  새 작업을 추가해보세요
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {total.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">작업</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <p>해당 프로젝트의 총 작업 수 표시</p>
      </CardFooter>
    </Card>
  );
}
// ...existing code...
