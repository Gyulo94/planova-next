"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/ui/separator";
import { useParameters } from "@/lib/hooks/util";
import { useFindWorkspaceById, useJoinWorkspace } from "@/lib/query";
import { Workspace } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  workspaceId: string;
}

export default function JoinWorkspaceForm({ workspaceId }: Props) {
  const { inviteCode } = useParameters();
  const router = useRouter();
  const { data } = useFindWorkspaceById(workspaceId);
  const { mutate: joinWorkspace } = useJoinWorkspace(workspaceId);
  const workspace: Workspace = data;
  function handleJoinWorkspace(inviteCode: string) {
    if (!inviteCode || workspace.inviteCode !== inviteCode) {
      toast.error("유효하지 않은 초대 코드입니다.");
      router.replace("/");
      return;
    } else {
      joinWorkspace(inviteCode, {
        onSuccess: () => {
          router.replace(`/workspaces/${workspaceId}`);
        },
      });
    }
  }
  return (
    <Card className="size-full max-w-lg border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          워크스페이스 참가
        </CardTitle>
      </CardHeader>
      <div className="border relative size-32 mx-auto rounded-lg overflow-hidden bg-neutral-100">
        <Image
          src={workspace.image!}
          fill
          className="object-center object-cover"
          alt={workspace.name}
        />
      </div>
      <p className="text-sm text-center px-4 text-muted-foreground">
        <strong>{workspace.name}</strong> 워크스페이스에 초대되었습니다. <br />
        아래 참가 버튼을 통해 참가할 수 있습니다.
      </p>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col  items-center">
          <Button
            className="w-full"
            size={"md"}
            type="button"
            onClick={() => handleJoinWorkspace(inviteCode)}
          >
            참가
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
