import { create } from "zustand";
import { OpenState } from "../types";

interface ProjectDialogState extends OpenState {
  workspaceId?: string;
  onOpen: (workspaceId?: string) => void;
}

export const useOpenProjectDialogStore = create<ProjectDialogState>((set) => ({
  isOpen: false,
  onOpen: (workspaceId) => set(() => ({ isOpen: true, workspaceId })),
  onClose: () => set(() => ({ isOpen: false })),
}));
