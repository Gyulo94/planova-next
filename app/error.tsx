"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        서버 요청 중 문제가 발생하였습니다.
      </p>
      <Button variant={"secondary"} size={"sm"}>
        <Link href="/">홈으로</Link>
      </Button>
    </div>
  );
}
