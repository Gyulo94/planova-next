import { create } from "zustand";
import { WorkspaceMember } from "../types";

interface WorkspaceMemberState {
  members: WorkspaceMember[];
  setMembers: (members: WorkspaceMember[]) => void;
  isAdmin: boolean;
  setIsAdmin: (userId: string) => boolean;
}

export const useWorkspaceMembers = create<WorkspaceMemberState>((set, get) => ({
  members: [],
  isAdmin: false,
  setMembers: (members) => set({ members }),
  setIsAdmin: (userId) => {
    const member = get().members.find((m) => m.id === userId);
    const isAdmin = member?.role === "ADMIN";
    set({ isAdmin });
    return isAdmin;
  },
}));
