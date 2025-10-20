import { Session } from "next-auth";
import z from "zod/v3";
import { Project } from ".";
import { PriorityTypes, StatusTypes } from "./../validations";
export type TaskFilterOptions = {
  status?: string;
  assigneeId?: string;
  priority?: string;
  dueDate?: string;
  startDate?: string;
  projectId?: string;
  search?: string;
  workspaceId?: string;
};

export type Task = {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  dueDate: Date;
  position: number;
  priority: z.infer<typeof PriorityTypes>;
  status: z.infer<typeof StatusTypes>;
  assignee: Session["user"];
  project: Project;
};

export type TaskCount = {
  total: number;
  difference: number;
};

export type TotalTaskCounts = {
  totalCount: TaskCount;
  completedCount: TaskCount;
  incompleteCount: TaskCount;
  assignedCount: TaskCount;
  overdueCount: TaskCount;
};
