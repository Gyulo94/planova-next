import ProjectAvatar from "@/components/project/project-avatar";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/user/user-avatar";
import { DEFAULT_AVATAR } from "@/lib/constants";
import { useFindWorkspaceMembers } from "@/lib/query";
import { useOpenUserDialogStore } from "@/lib/stores";
import { Workspace, WorkspaceMember } from "@/lib/types";

interface Props {
  workspace: Workspace;
}

export default function WorkspaceHeader({ workspace }: Props) {
  const { data: workspaceMembers } = useFindWorkspaceMembers(workspace.id);
  const { onOpen: opnUserDialog } = useOpenUserDialogStore();
  const members: WorkspaceMember[] = workspaceMembers.members;
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 my-5">
        <div className="flex gap-2">
          <ProjectAvatar name={workspace.name} url={workspace.image} />
          <h1 className="text-2xl font-bold">{workspace.name}</h1>
        </div>
      </div>
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <h3 className="text-sm font-medium">팀 멤버</h3>
          <div className="flex flex-wrap space-x-2">
            {members.map((member) => (
              <UserAvatar
                key={member.id}
                name={member.name}
                url={member.image || DEFAULT_AVATAR}
                className="size-9 2xl:size-10 border-2 border-background shadow cursor-pointer"
                onClick={() => opnUserDialog(member.id)}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
