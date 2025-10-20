"use client";

import { useCreateTask } from "@/lib/query";
import { useOpenTaskDialogStore } from "@/lib/stores";
import { PriorityTypes, StatusTypes, TaskFormSchema } from "@/lib/validations";
import { useSession } from "next-auth/react";
import { useState } from "react";
import z from "zod/v3";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import TaskForm from "./form/task-form";

export default function CreateTaskDialog() {
  const { isOpen, onClose, projectId } = useOpenTaskDialogStore();
  const { data: session } = useSession();
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutate: createTask } = useCreateTask(session?.user.id);

  const defaultValues = {
    name: "",
    description: "",
    status: "TODO" as z.infer<typeof StatusTypes>,
    priority: "MEDIUM" as z.infer<typeof PriorityTypes>,
    startDate: new Date(),
    dueDate: new Date(),
    assigneeId: session?.user.id ?? "",
    projectId: projectId ?? "",
  };

  function onSubmit(values: z.infer<typeof TaskFormSchema>) {
    setIsDisabled(true);
    createTask(values, {
      onSuccess: () => {
        setIsDisabled(false);
        onClose();
      },
      onError: () => {
        setIsDisabled(false);
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">새 작업 생성</DialogTitle>
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
