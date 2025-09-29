import z from "zod/v3";

export const PriorityTypes = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const StatusTypes = z.enum([
  "BACKLOG",
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "COMPLETED",
]);

export const TaskFormSchema = z.object({
  name: z.string().min(1, "작업 이름을 입력해주세요.").trim(),
  description: z.string().optional(),
  assigneeId: z.string().min(1, "담당자를 선택하세요."),
  projectId: z.string().optional(),
  startDate: z.date(),
  dueDate: z.date().optional(),
  priority: PriorityTypes,
  status: StatusTypes,
});
