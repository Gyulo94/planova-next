import { auth } from "@/auth";
import ChangePasswordSection from "@/components/user/profile/change-password-section";
import DeleteSection from "@/components/user/profile/delete-section";
import EditSection from "@/components/user/profile/edit-section";
import { findUserById } from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로필",
};

export default async function ProfilePage() {
  const session = await auth();
  const userId = session?.user?.id;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user", { id: userId }],
    queryFn: () => findUserById(userId),
  });

  const state = dehydrate(queryClient);
  return (
    <div className="max-w-3xl mx-auto py-10 flex flex-col gap-4 px-4">
      <HydrationBoundary state={state}>
        <EditSection userId={userId} />
        <ChangePasswordSection userId={userId} />
        <DeleteSection userId={userId} />
      </HydrationBoundary>
    </div>
  );
}
