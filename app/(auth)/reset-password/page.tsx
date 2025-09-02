import { auth } from "@/auth";
import EmailForm from "@/components/auth/email-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
};

export default async function ResetPassword() {
  const session = await auth();
  if (session && session.user) {
    return redirect("/");
  }
  return <EmailForm type="reset" />;
}
