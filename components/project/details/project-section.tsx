"use client";

import ProjectAvatar from "@/components/project/project-avatar";
import { Button } from "@/components/ui/button";
import { useFindProjectById } from "@/lib/query";
import { Project } from "@/lib/types";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  projectId: string;
  workspaceId: string;
}

export default function ProjectSection({ projectId, workspaceId }: Props) {
  const { data } = useFindProjectById(projectId);
  const project: Project = data;

  return (
    <div className="flex flex-col py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar name={project.name} url={project.image} />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div>
          <Button variant={"outline"} size={"sm"} asChild>
            <Link
              href={`/workspaces/${workspaceId}/projects/${projectId}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              수정
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
