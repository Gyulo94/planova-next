export type WorkspaceMember = {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: "ADMIN" | "MEMBER";
  provider: "이메일" | "구글" | "카카오";
  joinedAt: Date;
  createdAt: Date;
};
