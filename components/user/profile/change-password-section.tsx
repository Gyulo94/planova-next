"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateUserPassword } from "@/lib/query";
import { ChangePasswordFormSchema } from "@/lib/validations";
import { useState } from "react";
import z from "zod/v3";
import ChangePasswordForm from "../form/change-password-form";

interface Props {
  userId?: string;
}

export default function ChangePasswordSection({ userId }: Props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutate: updateUserPassword } = useUpdateUserPassword(userId);
  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  function onSubmit(values: z.infer<typeof ChangePasswordFormSchema>) {
    setIsDisabled(true);
    updateUserPassword(values, {
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
        <CardTitle className="text-lg">비밀번호 변경</CardTitle>
        <CardDescription>비밀번호를 변경합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm
          isDisabled={isDisabled}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      </CardContent>
    </Card>
  );
}
