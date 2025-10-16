import { create } from "zustand";
import { OpenState } from "../types";

interface TaskDialogState extends OpenState {
  projectId?: string;
  workspaceId?: string;
  selectedDate?: Date;
  onOpen: (
    projectId?: string,
    workspaceId?: string,
    selectedDate?: Date
  ) => void;
}

export const useOpenTaskDialogStore = create<TaskDialogState>((set) => ({
  projectId: undefined,
  workspaceId: undefined,
  selectedDate: undefined,
  isOpen: false,
  onOpen: (projectId, workspaceId, selectedDate) =>
    set(() => ({
      projectId,
      workspaceId,
      isOpen: true,
      selectedDate,
    })),
  onClose: () =>
    set(() => ({
      isOpen: false,
      projectId: undefined,
      workspaceId: undefined,
      selectedDate: undefined,
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
