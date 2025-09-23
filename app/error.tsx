"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <AlertTriangle />
      <p className="text-sm text-muted-foreground">
        서버 요청 중 문제가 발생하였습니다.
      </p>
      <Button variant={"secondary"}>
        <Link href="/">홈으로</Link>
      </Button>
    </div>
  );
}
