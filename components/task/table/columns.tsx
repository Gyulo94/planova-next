"use client";

import { TaskPriority, TaskStatus } from "@/lib/constants";
import { useParameters } from "@/lib/hooks/util";
import { useFindMyWorkspaceMemberInfo } from "@/lib/query";
import { Task } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, MoreVerticalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import UserAvatar from "../../user/user-avatar";
import TaskActions from "../task-actions";
import TaskDate from "../task-date";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-muted-foreground"
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          작업명
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { projectId, workspaceId } = useParameters();
      const name = row.original.name;
      const id = row.original.id;
      return (
        <div className="flex space-x-2 ">
          <Link
            href={`/workspaces/${workspaceId}/projects/${projectId}/tasks/${id}`}
            className="ml-4 min-w-[200px] w-full truncate font-medium block cursor-pointer underline-offset-3 hover:underline"
          >
            {name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center text-muted-foreground">
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            상태
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      const label = TaskStatus.find((s) => s.value === status)?.label;
      return (
        <div className="flex items-center justify-center gap-x-2 text-sm font-medium text-muted-foreground">
          <Badge variant={status}>{label}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center text-muted-foreground">
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            우선순위
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const priority = row.original.priority;
      const label = TaskPriority.find((s) => s.value === priority)?.label;
      return (
        <div className="flex items-center gap-x-2 justify-center text-sm font-medium">
          <Badge variant={priority}>{label}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center text-muted-foreground">
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            담당자
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      return (
        <div className="flex items-center justify-center gap-x-2 text-sm font-medium">
          <UserAvatar
            name={assignee.name}
            url={assignee.image}
            isTooltipEnabled={false}
          />
          <p className="line-clamp-1">{assignee.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center text-muted-foreground">
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            시작일
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const startDate = row.original.startDate.toString();
      return (
        <div className="flex items-center justify-center gap-x-2 text-sm font-medium">
          <p className={"truncate"}>{format(startDate, "yyyy-MM-dd")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center text-muted-foreground">
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            마감일
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate.toString();
      return (
        <div className="flex items-center justify-center gap-x-2 text-sm font-medium">
          <TaskDate value={dueDate} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { data: session } = useSession();
      const id = row.original.id;
      const projectId = row.original.project.id;
      const { workspaceId } = useParameters();
      const isAssignee = row.original.assignee.id === session?.user.id;
      const { data: myInfo } = useFindMyWorkspaceMemberInfo(
        workspaceId,
        session?.user.id
      );
      return (
        <TaskActions id={id} projectId={projectId}>
          {myInfo.role === "ADMIN" || isAssignee ? (
            <Button variant={"ghost"} className="size-8 p-0 mr-4">
              <MoreVerticalIcon className="size-4" />
            </Button>
          ) : null}
        </TaskActions>
      );
    },
  },
];
