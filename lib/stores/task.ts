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

interface TaskEditDialogState extends OpenState {
  id?: string;
  projectId?: string;
  onOpen: (id?: string, projectId?: string) => void;
}

export const useEditTaskDialogStore = create<TaskEditDialogState>((set) => ({
  id: undefined,
  projectId: undefined,
  isOpen: false,
  onOpen: (id, projectId) => set(() => ({ id, projectId, isOpen: true })),
  onClose: () =>
    set(() => ({
      isOpen: false,
      id: undefined,
      projectId: undefined,
    })),
}));
