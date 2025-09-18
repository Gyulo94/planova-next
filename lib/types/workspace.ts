import { Session } from "next-auth";

export type Workspace = {
  id: string;
  name: string;
  image?: string;
  owner: Session["user"];
  inviteCode: string;
  createdAt: Date;
};
