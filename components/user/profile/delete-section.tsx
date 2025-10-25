"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/ui/separator";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { useDeleteUser } from "@/lib/query";
import { useState } from "react";

interface Props {
  userId?: string;
}

export default function DeleteSection({ userId }: Props) {
  const { mutate: deleteUser } = useDeleteUser();
  const [isDisabled, setIsDisabled] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 회원탈퇴하시겠습니까?",
    "삭제된 회원 데이터는 복구할 수 없습니다."
  );

  async function handleDelete() {
    setIsDisabled(true);
    const ok = await confirm();
    if (ok) {
      deleteUser(userId, {
        onSuccess: () => {
          setIsDisabled(false);
        },
        onError: () => {
          setIsDisabled(false);
        },
      });
    }
  }
  return (
    <>
      <ConfirmDialog />
      <Card className="p-7 border-none shadow-none">
        <div className="flex flex-col">
          <CardTitle className="text-lg">회원탈퇴</CardTitle>
          <p className="text-sm text-muted-foreground">
            회원탈퇴를 하면 해당 계정의 모든 데이터가 영구적으로 삭제됩니다. 이
            작업은 되돌릴 수 없습니다.
          </p>
          <DottedSeparator className="my-7" />
          <Button
            variant="destructive"
            size={"sm"}
            className="mt-6 w-fit ml-auto"
            disabled={isDisabled}
            type="button"
            onClick={handleDelete}
          >
            회원탈퇴
          </Button>
        </div>
      </Card>
    </>
  );
}
