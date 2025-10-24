"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WorkspaceForm from "@/components/workspace/form/workspace-form";
import { findWorkspaces } from "@/lib/actions";
import { useCreateWorkspace } from "@/lib/query";
import { WorkspaceFormSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod/v3";

export default function WorkspacePage() {
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutate: createWorkspace } = useCreateWorkspace();
  const router = useRouter();

  const defaultValues = {
    name: "",
    image: "",
  };

  useEffect(() => {
    const verification = async () => {
      const workspaces = await findWorkspaces();
      if (workspaces.length > 0) {
        router.replace(`/workspaces/${workspaces[0].id}`);
      }
    };
    verification();
  }, []);

  function onSubmit(values: z.infer<typeof WorkspaceFormSchema>) {
    console.log(values);

    setIsDisabled(true);
    createWorkspace(values, {
      onSuccess: (data) => {
        setIsDisabled(false);
        window.location.href = `/workspaces/${data.body.id}`;
      },
      onError: () => {
        setIsDisabled(false);
      },
    });
  }

  return (
    <>
      <div className="bg-background absolute left-0 top-0 min-h-screen w-full z-50" />
      <Dialog open={true}>
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
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
