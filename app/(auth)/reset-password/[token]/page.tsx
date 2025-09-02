import { auth } from "@/auth";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
};

export default async function Signup() {
  const session = await auth();
  if (session && session.user) {
    return redirect("/");
  }
  return <ResetPasswordForm />;
}
