"use client";

import { DEFAULT_AVATAR } from "@/lib/constants";
import { useConfirm } from "@/lib/hooks/use-confirm";
import {
  useFindMyWorkspaceMemberInfo,
  useFindWorkspaceById,
  useFindWorkspaceMembers,
  useRemoveWorkspaceMember,
} from "@/lib/query";
import { useUpdateWorkspaceMember } from "@/lib/query/workspace-member";
import { WorkspaceMember } from "@/lib/types";
import { MoreVerticalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import UserAvatar from "../user/user-avatar";

interface Props {
  workspaceId: string;
}

export default function MembersList({ workspaceId }: Props) {
  const { data: session } = useSession();
  const { data } = useFindWorkspaceMembers(workspaceId);
  const { data: myInfo } = useFindMyWorkspaceMemberInfo(
    workspaceId,
    session?.user.id
  );
  const { data: workspace } = useFindWorkspaceById(workspaceId);
  const { mutate: removeMember } = useRemoveWorkspaceMember(workspaceId);
  const { mutate: updateMember } = useUpdateWorkspaceMember(workspaceId);
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 멤버를 추방하시겠습니까?",
    "추방된 멤버는 워크스페이스에 다시 접근할 수 없습니다."
  );
  const members: WorkspaceMember[] = data?.members || [];

  async function handleRemoveMember(memberId: string) {
    const ok = await confirm();
    if (ok) {
      removeMember(memberId);
    }
  }

  async function handleUpdateMember(memberId: string) {
    if (memberId === workspace.owner.id) {
      toast.error("워크스페이스 소유자의 권한은 변경할 수 없습니다.");
      return;
    }
    updateMember(memberId);
  }

  return (
    <>
      <ConfirmDialog />
      <Card className="size-full border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">워크스페이스 멤버</CardTitle>
          <CardDescription>워크스페이스 멤버 목록입니다.</CardDescription>
        </CardHeader>
        <CardContent className="p-7">
          {members.map((member, index) => (
            <Fragment key={member.id}>
              <div className="flex items-center gap-2">
                <UserAvatar
                  url={member.image || DEFAULT_AVATAR}
                  name={member.name}
                  size="lg"
                  className="cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-medium">
                    {member.name}{" "}
                    {member.id === workspace.owner.id && (
                      <span>
                        <Badge
                          variant={"default"}
                          className="py-0 px-1.5 ml-auto"
                        >
                          소유자
                        </Badge>
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
                {myInfo.id !== member.id && myInfo.role === "ADMIN" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="ml-auto"
                        variant={"ghost"}
                        size={"icon"}
                      >
                        <MoreVerticalIcon className="size-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end">
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() => handleUpdateMember(member.id)}
                        disabled={false}
                      >
                        {member.role === "MEMBER"
                          ? "어드민으로 변경"
                          : "멤버로 변경"}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="font-medium text-destructive"
                        onClick={() => handleRemoveMember(member.id)}
                        disabled={false}
                      >
                        멤버 추방
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  myInfo.id === member.id && (
                    <Badge className="ml-auto">나</Badge>
                  )
                )}
              </div>
              {index < members.length - 1 && <Separator className="my-2.5" />}
            </Fragment>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
