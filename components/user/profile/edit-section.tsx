"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFindUserById, useUpdateUser } from "@/lib/query";
import { UserFormSchema } from "@/lib/validations";
import { Session } from "next-auth";
import { useState } from "react";
import z from "zod/v3";
import UserForm from "../form/user-form";

interface Props {
  userId?: string;
}

export default function EditSection({ userId }: Props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { data } = useFindUserById(userId);
  const { mutate: updateUser } = useUpdateUser(userId);
  const user: Session["user"] = data;
  const defaultValues = {
    name: user?.name,
    image: user?.image,
  };

  function onSubmit(values: z.infer<typeof UserFormSchema>) {
    setIsDisabled(true);
    updateUser(values, {
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
        <CardTitle className="text-lg">회원정보 수정</CardTitle>
        <CardDescription>회원정보를 수정합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <UserForm
          isDisabled={isDisabled}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      </CardContent>
    </Card>
  );
}
