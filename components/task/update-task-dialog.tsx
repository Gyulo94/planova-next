"use client";

import { useFindTaskById, useUpdateTask } from "@/lib/query";
import { useEditTaskDialogStore } from "@/lib/stores";
import { Task } from "@/lib/types";
import { PriorityTypes, StatusTypes, TaskFormSchema } from "@/lib/validations";
import { useSession } from "next-auth/react";
import { useState } from "react";
import z from "zod/v3";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Loader from "../ui/loader";
import TaskForm from "./form/task-form";

export default function UpdateTaskDialog() {
  const { isOpen, onClose, projectId, id } = useEditTaskDialogStore();
  const { data: session } = useSession();
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutate: updateTask } = useUpdateTask(projectId, id);
  const { data, isLoading } = useFindTaskById(id);
  const task: Task = data ?? {};

  // console.log(task);

  const defaultValues = {
    name: task.name ?? "",
    description: task.description ?? "",
    status: task.status ?? ("TODO" as z.infer<typeof StatusTypes>),
    priority: task.priority ?? ("MEDIUM" as z.infer<typeof PriorityTypes>),
    startDate: new Date(task.startDate) ?? new Date(),
    dueDate: new Date(task.dueDate) ?? new Date(),
    assigneeId: task.assignee?.id,
    projectId,
  };

  function onSubmit(values: z.infer<typeof TaskFormSchema>) {
    setIsDisabled(true);
    updateTask(values, {
      onSuccess: () => {
        setIsDisabled(false);
        onClose();
      },
      onError: () => {
        setIsDisabled(false);
      },
    });
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-cente">
        <Loader />
      </div>
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">작업 수정</DialogTitle>
        </DialogHeader>
        <TaskForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          onClose={onClose}
          isDisabled={isDisabled}
        />
      </DialogContent>
    </Dialog>
  );
}
