"use client";

import { useFindUserById } from "@/lib/query";
import { useOpenUserDialogStore } from "@/lib/stores";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import UserProfile from "./user-profile";

export default function UserProfileDialog() {
  const { id, isOpen, onClose } = useOpenUserDialogStore();
  const { data, isLoading } = useFindUserById(id);
  const user = data;

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">유저 정보</DialogTitle>
        </DialogHeader>
        {user ? (
          <UserProfile user={user} onClose={onClose} />
        ) : (
          <UserProfileSkeleton />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function UserProfileSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center justify-center">
        <Skeleton className="h-28 w-28 rounded-full" />
      </div>

      <div className="mt-4 text-center">
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="mt-2 h-4 w-56 mx-auto" />
      </div>

      <div className="mt-5">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
