import { auth } from "@/auth";
import { SignupForm } from "@/components/auth/signup-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "회원가입",
};

export default async function Signup() {
  const session = await auth();
  if (session && session.user) {
    return redirect("/");
  }
  return <SignupForm />;
}
