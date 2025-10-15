import { TaskPriority } from "@/lib/constants";
import { Task } from "@/lib/types";
import { format } from "date-fns";
import { MoreHorizontalIcon } from "lucide-react";
import ProjectAvatar from "../../project/project-avatar";
import { Badge } from "../../ui/badge";
import { DottedSeparator } from "../../ui/separator";
import UserAvatar from "../../user/user-avatar";
import TaskActions from "../task-actions";
import TaskDate from "../task-date";

interface Props {
  task: Task;
}

export default function KanbanCard({ task }: Props) {
  const priorityLabel = TaskPriority.find(
    (s) => s.value === task.priority
  )?.label;
  return (
    <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskActions id={task.id} projectId={task.project.id}>
          <MoreHorizontalIcon className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition z-50 cursor-pointer" />
        </TaskActions>
      </div>
      <DottedSeparator />
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-x-1.5">
          <div className="size-1 rounded-full bg-neutral-300" />
          <p className="text-xs text-neutral-500">
            {format(task.startDate, "yyyy-MM-dd")}
          </p>
          <TaskDate value={task.dueDate.toString()} className="text-xs" />
        </div>
        <Badge variant={task.priority}>{priorityLabel}</Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1.5">
          <ProjectAvatar
            name={task.project.name}
            url={task.project.image}
            size="sm"
          />
          <span className="text-xs font-medium">{task.project.name}</span>
        </div>
        <UserAvatar
          name={task.assignee.name}
          url={task.assignee.image}
          size="sm"
        />
      </div>
    </div>
  );
}
