import { useConfirm } from "@/lib/hooks/use-confirm";
import { useParameters } from "@/lib/hooks/util";
import { useDeleteTask, useFindWorkspaceMembers } from "@/lib/query";
import { useEditTaskDialogStore, useWorkspaceMembers } from "@/lib/stores";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  id: string;
  projectId: string;
  children: ReactNode;
}

export default function TaskActions({ id, projectId, children }: Props) {
  const { mutate: deleteTask } = useDeleteTask(projectId);
  const { data: session } = useSession();
  const { workspaceId } = useParameters();
  const router = useRouter();
  const { data: workspaceMembers } = useFindWorkspaceMembers(workspaceId);
  const { setMembers, setIsAdmin } = useWorkspaceMembers();
  const { onOpen } = useEditTaskDialogStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 해당 작업을 삭제하시겠습니까?",
    "삭제된 작업 데이터는 복구할 수 없습니다."
  );

  function onViewDetails() {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}/tasks/${id}`);
  }

  async function onUpdate() {
    setMembers(workspaceMembers.members || []);
    setIsAdmin(session?.user.id!);
    onOpen(id, projectId);
  }

  async function onDelete() {
    const ok = await confirm();
    if (ok) {
      deleteTask(id);
    }
  }

  return (
    <>
      <ConfirmDialog />
      <div className="flex justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={onViewDetails}
              disabled={false}
              className="font-medium p-[10px]"
            >
              <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
              자세히 보기
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onUpdate}
              disabled={false}
              className="font-medium p-[10px]"
            >
              <PencilIcon className="size-4 mr-2 stroke-2" />
              편집
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              disabled={false}
              className="text-destructive focus:text-destructive font-medium p-[10px]"
            >
              <TrashIcon className=" text-destructive focus:text-destructive size-4 mr-2 stroke-2" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
