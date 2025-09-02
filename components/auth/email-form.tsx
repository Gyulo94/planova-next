"use client";

import { Input } from "@/components/ui/input";
import { useSendMail } from "@/lib/query";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type Email = { email: string };

export function EmailForm({ type }: { type: "signup" | "reset" }) {
  const { mutate: sendMail } = useSendMail();

  const form = useForm<Email>({
    resolver: zodResolver(
      z.object({
        email: z
          .string()
          .email("이메일 형식이 아닙니다.")
          .min(1, { message: "이메일을 입력해주세요." })
          .trim(),
      })
    ),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(value: Email) {
    sendMail({ ...value, type });
  }
  return (
    <div className="flex flex-col gap-6">
      <Card className="py-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">이메일 인증</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input placeholder="이메일" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button>이메일 인증</Button>
                <div className="text-sm text-center text-muted-foreground">
                  이미 계정이 있나요?{" "}
                  <Link
                    href={"/login"}
                    className="text-foreground link hover:underline underline-offset-2"
                  >
                    로그인
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmailForm;
