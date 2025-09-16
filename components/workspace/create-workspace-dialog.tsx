"use client";

import { useCreateWorkspace } from "@/lib/query";
import { useOpenWorkspaceDialogStore } from "@/lib/stores";
import { WorkspaceFormSchema } from "@/lib/validations";
import { useState } from "react";
import z from "zod/v3";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import WorkspaceForm from "./form/workspace-form";

export default function CreateWorkspaceDialog() {
  const { isOpen, onClose } = useOpenWorkspaceDialogStore();
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutate: createWorkspace } = useCreateWorkspace();

  const defaultValues = {
    name: "",
  };

  function onSubmit(values: z.infer<typeof WorkspaceFormSchema>) {
    setIsDisabled(true);
    createWorkspace(values, {
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
          <DialogTitle className="text-xl font-bold">
            워크스페이스 생성
          </DialogTitle>
        </DialogHeader>
        <WorkspaceForm
          isDisabled={isDisabled}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
