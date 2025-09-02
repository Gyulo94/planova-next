"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";

export default function SocialLogin({ provider }: { provider: string }) {
  const providerLogin = async () => {
    await signIn(provider, {
      redirect: true,
      redirectTo: "/",
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      onClick={providerLogin}
    >
      {provider === "kakao" ? (
        <p className="flex items-center gap-2">
          <Icon.kakao /> 카카오
        </p>
      ) : (
        <p className="flex items-center gap-2">
          <Icon.google /> 구글
        </p>
      )}
    </Button>
  );
}
