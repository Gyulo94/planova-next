import { auth } from "@/auth";
import { findWorkspaces } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const workspaces = await findWorkspaces();
  if (workspaces.length > 0) {
    redirect(`/workspaces/${workspaces[0].id}`);
  } else {
    redirect("/workspaces");
  }
  return <div className="w-full min-h-screen bg-background z-50" />;
}
