"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFindProjectById, useUpdateProject } from "@/lib/query";
import { Project } from "@/lib/types";
import { ProjectFormSchema } from "@/lib/validations";
import { useState } from "react";
import z from "zod/v3";
import ProjectForm from "../form/project-form";

interface Props {
  projectId: string;
  workspaceId: string;
}

export default function EditSection({ projectId, workspaceId }: Props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { data } = useFindProjectById(projectId);
  const { mutate: updateProject } = useUpdateProject(projectId);
  const project: Project = data;
  const defaultValues = {
    name: project?.name,
    image: project?.image,
    workspaceId,
  };

  function onSubmit(values: z.infer<typeof ProjectFormSchema>) {
    setIsDisabled(true);
    updateProject(values, {
      onSuccess: () => {
        setIsDisabled(false);
      },
      onError: () => {
        setIsDisabled(false);
      },
    });
  }
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">프로젝트 수정</CardTitle>
        <CardDescription>프로젝트 정보를 수정합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectForm
          id={projectId}
          isDisabled={isDisabled}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      </CardContent>
    </Card>
  );
}
