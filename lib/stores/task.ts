import { create } from "zustand";
import { OpenState } from "../types";

interface TaskDialogState extends OpenState {
  projectId?: string;
  workspaceId?: string;
  onOpen: (projectId?: string, workspaceId?: string) => void;
}

export const useOpenTaskDialogStore = create<TaskDialogState>((set) => ({
  projectId: undefined,
  workspaceId: undefined,
  isOpen: false,
  onOpen: (projectId, workspaceId) =>
    set(() => ({ projectId, workspaceId, isOpen: true })),
  onClose: () =>
    set(() => ({
      isOpen: false,
      projectId: undefined,
      workspaceId: undefined,
    })),
}));
