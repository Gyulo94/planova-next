"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v3";

interface Props {
  isDisabled?: boolean;
  defaultValues?: z.infer<typeof ChangePasswordFormSchema>;
  onSubmit: (data: z.infer<typeof ChangePasswordFormSchema>) => void;
}

export default function ChangePasswordForm({
  isDisabled,
  defaultValues,
  onSubmit,
}: Props) {
  const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-4"
        suppressHydrationWarning
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>현재 비밀번호</FormLabel>
              <FormControl>
                <Input
                  placeholder="현재 비밀번호를 입력하세요"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>새로운 비밀번호</FormLabel>
              <FormControl>
                <Input
                  placeholder="새로운 비밀번호를 입력하세요"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>새로운 비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  placeholder="새로운 비밀번호를 재입력하세요"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isDisabled}>
            변경
          </Button>
        </div>
      </form>
    </Form>
  );
}
