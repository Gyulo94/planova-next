"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFindWorkspaceById, useUpdateWorkspace } from "@/lib/query";
import { Workspace } from "@/lib/types";
import { WorkspaceFormSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod/v3";
import WorkspaceForm from "../form/workspace-form";

interface Props {
  workspaceId: string;
}

export default function EditSection({ workspaceId }: Props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { data } = useFindWorkspaceById(workspaceId);
  const { mutate: updateWorkspace } = useUpdateWorkspace(workspaceId);
  const router = useRouter();
  const workspace: Workspace = data;
  const defaultValues = {
    name: workspace?.name,
    image: workspace?.image,
  };

  function onSubmit(values: z.infer<typeof WorkspaceFormSchema>) {
    setIsDisabled(true);
    updateWorkspace(values, {
      onSuccess: () => {
        setIsDisabled(false);
        router.push(`/workspaces/${workspaceId}`);
      },
      onError: () => {
        setIsDisabled(false);
      },
    });
  }
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">워크스페이스 수정</CardTitle>
        <CardDescription>워크스페이스 정보를 수정합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <WorkspaceForm
          id={workspaceId}
          isDisabled={isDisabled}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      </CardContent>
    </Card>
  );
}
