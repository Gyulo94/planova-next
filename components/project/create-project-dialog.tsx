"use client";

import { useCreateProject } from "@/lib/query";
import { useOpenProjectDialogStore } from "@/lib/stores";
import { ProjectFormSchema } from "@/lib/validations";
import { useState } from "react";
import z from "zod/v3";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ProjectForm from "./form/project-form";

export default function CreateProjectDialog() {
  const { isOpen, onClose, workspaceId } = useOpenProjectDialogStore();
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutate: createProject } = useCreateProject();

  const defaultValues = {
    name: "",
    image: "",
    workspaceId,
  };

  function onSubmit(values: z.infer<typeof ProjectFormSchema>) {
    setIsDisabled(true);
    createProject(values, {
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
          <DialogTitle className="text-xl font-bold">프로젝트 생성</DialogTitle>
        </DialogHeader>
        <ProjectForm
          isDisabled={isDisabled}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
