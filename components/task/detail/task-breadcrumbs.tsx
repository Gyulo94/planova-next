import ProjectAvatar from "@/components/project/project-avatar";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { useDeleteTask } from "@/lib/query";
import { Task } from "@/lib/types";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  task: Task;
  workspaceId: string;
}

export default function TaskBreadcrumbs({ task, workspaceId }: Props) {
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 해당 작업을 삭제하시겠습니까?",
    "삭제된 작업 데이터는 복구할 수 없습니다."
  );
  const { mutate: deleteTask } = useDeleteTask(task.project.id);
  const router = useRouter();

  async function onDelete() {
    const ok = await confirm();
    if (ok) {
      deleteTask(task.id, {
        onSuccess: () => {
          router.replace(
            `/workspaces/${workspaceId}/projects/${task.project.id}`
          );
        },
      });
    }
  }

  return (
    <>
      <ConfirmDialog />
      <div className="flex items-center gap-x-2">
        <ProjectAvatar
          name={task.project.name}
          url={task.project.image}
          size={"sm"}
        />
        <Link href={`/workspaces/${workspaceId}/projects/${task.project.id}`}>
          <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
            {task.project.name}
          </p>
        </Link>
        <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
        <p className="text-sm lg:text-lg font-semibold">{task.name}</p>
        <Button
          className="ml-auto"
          variant="destructive"
          size="sm"
          onClick={onDelete}
        >
          <TrashIcon className="size-4 lg:mr-2" />
          <span className="hidden lg:block">작업 삭제</span>
        </Button>
      </div>
    </>
  );
}
