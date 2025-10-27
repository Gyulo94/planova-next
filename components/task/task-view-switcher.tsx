"use client";

import {
  useBulkUpdateTask,
  useFindWorkspaceById,
  useFindWorkspaceMembers,
} from "@/lib/query";
import {
  useOpenTaskDialogStore,
  useProjects,
  useWorkspaceMembers,
} from "@/lib/stores";
import { Task } from "@/lib/types";
import { StatusTypes } from "@/lib/validations";
import { PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";
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
  projectId?: string;
  userId?: string;
  tasks: Task[];
  type: "workspace" | "project";
}

export default function TaskViewSwitcher({
  workspaceId,
  projectId,
  userId,
  tasks,
  type,
}: Props) {
  const { onOpen } = useOpenTaskDialogStore();
  const { data: workspaceMembers } = useFindWorkspaceMembers(workspaceId);
  const { data: workspace } = useFindWorkspaceById(workspaceId);
  const { setProjects } = useProjects();
  const { setMembers, setIsAdmin } = useWorkspaceMembers();

  const { mutate: bulkUpdateTask } = useBulkUpdateTask(projectId, workspaceId);

  const [view, setView] = useQueryState("view", {
    defaultValue: "table",
  });

  useEffect(() => {
    setMembers(workspaceMembers.members || []);
    setIsAdmin(userId!);
  }, [setMembers, setIsAdmin]);

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
    [bulkUpdateTask]
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
              setProjects(workspace.projects || []);
              onOpen(projectId, workspaceId);
            }}
          >
            <PlusIcon className="size-4 mr-2" />새 작업
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters workspaceId={workspaceId} type={type} />
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
