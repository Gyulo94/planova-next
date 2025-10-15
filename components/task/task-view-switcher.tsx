"use client";

import { useTaskFilters } from "@/lib/hooks/util";
import {
  useBulkUpdateTask,
  useFindTasksByProjectId,
  useFindWorkspaceMembers,
} from "@/lib/query";
import { useOpenTaskDialogStore, useWorkspaceMembers } from "@/lib/stores";
import { TaskFilterOptions } from "@/lib/types";
import { StatusTypes } from "@/lib/validations";
import { PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback } from "react";
import z from "zod/v3";
import { Button } from "../ui/button";
import { DottedSeparator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import DataCalendar from "./calendar/data-calendar";
import DataFilters from "./data-filters";
import DataKanban from "./kanban/data-kanban";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

interface Props {
  workspaceId: string;
  projectId: string;
  userId?: string;
}

export default function TaskViewSwitcher({
  workspaceId,
  projectId,
  userId,
}: Props) {
  const { onOpen } = useOpenTaskDialogStore();
  const { data: workspaceMembers } = useFindWorkspaceMembers(workspaceId);
  const { setMembers, setIsAdmin } = useWorkspaceMembers();
  const [{ status, assigneeId, priority, dueDate, startDate, search }] =
    useTaskFilters();
  const { mutate: bulkUpdateTask } = useBulkUpdateTask(projectId);
  const filterOptions: TaskFilterOptions = {
    status: status || undefined,
    priority: priority || undefined,
    assigneeId: assigneeId || undefined,
    search: search || undefined,
    startDate: startDate || undefined,
    dueDate: dueDate || undefined,
  };
  const { data: tasks } = useFindTasksByProjectId(projectId, filterOptions);

  const [view, setView] = useQueryState("view", {
    defaultValue: "table",
  });

  const onKanbanChange = useCallback(
    (
      tasks: {
        id: string;
        status: z.infer<typeof StatusTypes>;
        position: number;
      }[]
    ) => {
      // console.log(tasks);
      bulkUpdateTask(tasks);
    },
    []
  );

  return (
    <Tabs
      className="flex-1 w-full border rounded-lg bg-background"
      defaultValue={view}
      onValueChange={(value) => setView(value)}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8-w-full lg:w-auto" value="table">
              테이블
            </TabsTrigger>
            <TabsTrigger className="h-8-w-full lg:w-auto" value="kanban">
              칸반
            </TabsTrigger>
            <TabsTrigger className="h-8-w-full lg:w-auto" value="calendar">
              캘린더
            </TabsTrigger>
          </TabsList>
          <Button
            size={"sm"}
            className="w-full lg:w-auto"
            onClick={() => {
              setMembers(workspaceMembers.members || []);
              setIsAdmin(userId!);
              onOpen(projectId, workspaceId);
            }}
          >
            <PlusIcon className="size-4 mr-2" />새 작업
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters workspaceId={workspaceId} />
        <DottedSeparator className="my-4" />
        <>
          <TabsContent value="table" className="mt-0">
            <DataTable columns={columns} data={tasks ?? []} />
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            <DataKanban onChange={onKanbanChange} data={tasks ?? []} />
          </TabsContent>
          <TabsContent value="calendar" className="mt-0 h-full">
            <DataCalendar data={tasks ?? []} />
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
}
