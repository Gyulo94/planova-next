import { auth } from "@/auth";
import { findWorkspaces } from "@/lib/actions";
import { Workspace } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  } else {
    const workspaces: Workspace[] = await findWorkspaces();
    redirect(`/workspaces/${workspaces[0].id}`);
  }
  return null;
}
