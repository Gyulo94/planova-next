import { Session } from "next-auth";
import { Project } from "./project";

export type Workspace = {
  id: string;
  name: string;
  image?: string;
  owner: Session["user"];
  inviteCode: string;
  createdAt: Date;
  projects: Project[];
};
