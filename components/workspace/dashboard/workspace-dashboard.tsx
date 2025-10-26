"use client";

import ProjectAvatar from "@/components/project/project-avatar";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/ui/separator";
import {
  useFindProjectsByWorkspaceId,
  useFindTaskCountsByWorkspaceId,
  useFindTasksByWorkspaceId,
  useFindWorkspaceById,
  useFindWorkspaceMembers,
} from "@/lib/query";
import {
  useOpenProjectDialogStore,
  useOpenTaskDialogStore,
  useProjects,
  useWorkspaceMembers,
} from "@/lib/stores";
import { Project, Task, TotalTaskCounts } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "../../ui/card";
import CircleProgress from "../../ui/circle-process";
import TaskDistributionChart from "./task-distribution-chart";
import WorkspaceHeader from "./worksapce-header";

interface Props {
  workspaceId: string;
  userId?: string;
}

export default function WorkspaceDasahboard({ workspaceId, userId }: Props) {
  const { data: counts } = useFindTaskCountsByWorkspaceId(workspaceId);
  const { data: tasks } = useFindTasksByWorkspaceId(workspaceId);
  const { data: workspace } = useFindWorkspaceById(workspaceId);
  const { data: workspaceMembers } = useFindWorkspaceMembers(workspaceId);
  const { data: projects } = useFindProjectsByWorkspaceId(workspaceId);
  const { setProjects } = useProjects();
  const { onOpen: openTaskDialog } = useOpenTaskDialogStore();
  const { onOpen: openProjectDialog } = useOpenProjectDialogStore();
  const { setMembers, setIsAdmin } = useWorkspaceMembers();
  const workspaceCounts: TotalTaskCounts = counts || {
    totalCount: { total: 0 },
    todoCount: { total: 0 },
    inProgressCount: { total: 0 },
    completedCount: { total: 0 },
    overdueCount: { total: 0 },
  };

  const projectsList = useMemo(() => projects ?? [], [projects]);
  const tasksList = useMemo(() => tasks ?? [], [tasks]);
  const workspaceMembersList = useMemo(
    () => workspaceMembers?.members ?? [],
    [workspaceMembers?.members]
  );

  useEffect(() => {
    setMembers(workspaceMembersList);
    setIsAdmin(userId ?? "");
  }, [workspaceMembersList, userId, setMembers, setIsAdmin]);

  if (!workspace) return notFound();

  if (!workspace) return notFound();

  return (
    <div className="flex flex-col gap-6 px-2 md:px-4 2xl:px-6 py-0">
      <WorkspaceHeader workspace={workspace} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <CircleProgress
            title="할 일"
            value={
              (workspaceCounts.todoCount?.total ??
                0 / workspaceCounts.totalCount.total) * 100
            }
            subTitle={`${workspaceCounts.todoCount?.total}개 시작 예정`}
            variant="default"
          />
        </Card>
        <Card className="p-4">
          <CircleProgress
            title="진행 중"
            value={
              (workspaceCounts.inProgressCount?.total ??
                0 / workspaceCounts.totalCount.total) * 100
            }
            subTitle={`${workspaceCounts.inProgressCount?.total}개 진행 중`}
            variant="inProgress"
          />
        </Card>
        <Card className="p-4">
          <CircleProgress
            title="완료"
            value={
              (workspaceCounts.completedCount?.total ??
                0 / workspaceCounts.totalCount.total) * 100
            }
            subTitle={`${workspaceCounts.completedCount?.total}개 완료`}
            variant="success"
          />
        </Card>
        <Card className="p-4">
          <CircleProgress
            title="지연됨"
            value={
              (workspaceCounts.overdueCount?.total ??
                0 / workspaceCounts.totalCount.total) * 100
            }
            subTitle={`${workspaceCounts.overdueCount?.total}개 지연됨`}
            variant="warning"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskDistributionChart counts={workspaceCounts} />

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              프로젝트 ({projectsList.length})
            </h3>
            <Button
              size={"icon"}
              onClick={() => openProjectDialog(workspaceId)}
            >
              <PlusIcon className="suze-4" />
            </Button>
          </div>
          <DottedSeparator />
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projectsList.slice(0, 10).map((project: Project) => (
              <li key={project.id}>
                <Link
                  href={`/workspaces/${workspaceId}/projects/${project.id}`}
                >
                  <Card className="shadow-none rounded-lg hover:opacity-75 transition py-0 hover:bg-accent">
                    <CardContent className="p-4 flex items-center gap-x-2.5">
                      <ProjectAvatar name={project.name} url={project.image} />
                      <p className="text-lg font-medium truncate">
                        {project.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
            <li className="col-span-2 text-sm text-muted-foreground text-center hidden first-of-type:block">
              프로젝트가 없습니다.
            </li>
          </ul>
        </Card>

        <Card className="p-4 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              최근 작업 ({tasksList.length})
            </h3>
            <Button
              size={"icon"}
              onClick={() => {
                setProjects(workspace.projects || []);
                openTaskDialog(undefined, workspaceId);
              }}
            >
              <PlusIcon className="suze-4" />
            </Button>
          </div>
          <DottedSeparator />
          <ul className="flex flex-col gap-y-4">
            {tasksList.slice(0, 3).map((task: Task) => (
              <li key={task.id}>
                <Link href={`/workspaces/${workspaceId}/tasks/${task.id}`}>
                  <Card className="shadow-none rounded-lg hover:opacity-75 transition py-0 hover:bg-accent">
                    <CardContent className="p-4">
                      <p className="text-lg font-medium truncate">
                        {task.name}
                      </p>
                      <div className="flex items-center gap-x-2">
                        <p>{task.project.name}</p>
                        <div className="size-1 rounded-full bg-neutral-300" />
                        <div className="text-sm text-muted-foreground flex items-center">
                          <CalendarIcon className="size-3 mr-1" />
                          <ClientRelativeDate date={task.createdAt} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
            <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
              작업이 없습니다.
            </li>
          </ul>
          {tasksList.length > 3 && (
            <Button className="w-full" asChild>
              <Link href={`/workspaces/${workspaceId}/tasks`}>더 보기</Link>
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}

function ClientRelativeDate({ date }: { date: string | Date }) {
  const [relative, setRelative] = useState<string>("");

  useEffect(() => {
    setRelative(formatDistanceToNow(new Date(date), { locale: ko }) + " 전");
  }, [date]);

  return <span>{relative}</span>;
}
