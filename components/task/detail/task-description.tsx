import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { DottedSeparator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateTask } from "@/lib/query";
import { Task } from "@/lib/types";
import { PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  task: Task;
}

export default function TeskDescription({ task }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState(task.description);

  const { mutate: updateTask } = useUpdateTask(task.project.id, task.id);

  function onSave(value: string) {
    setIsPending(true);
    updateTask(
      {
        name: task.name,
        description: value,
        status: task.status,
        priority: task.priority,
        startDate: new Date(task.startDate),
        dueDate: new Date(task.dueDate),
        assigneeId: task.assignee?.id,
        projectId: task.project.id,
      },
      {
        onSuccess: () => {
          setValue("");
          setIsEditing(false);
          setIsPending(false);
        },
        onError: () => {
          setValue("");
          setIsEditing(false);
          setIsPending(false);
        },
      }
    );
  }
  return (
    <div className="p-4 rounded-lg bg-background">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">상세내용</p>
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="size-4 mr-2" />
          )}{" "}
          {isEditing ? "취소" : "편집"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="상세내용을 입력하세요."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            size={"sm"}
            className="w-fit ml-auto"
            onClick={() => onSave(value ?? "")}
          >
            {isPending ? <Loader /> : "저장"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">상세내용이 없습니다.</span>
          )}
        </div>
      )}
    </div>
  );
}
