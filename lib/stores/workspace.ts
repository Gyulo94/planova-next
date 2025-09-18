import { create } from "zustand";
import { OpenState } from "../types";

export const useOpenWorkspaceDialogStore = create<OpenState>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));

interface EditWorkspaceDialogState extends OpenState {
  id?: string;
  onOpen: (id?: string) => void;
}

export const useEditWorkspaceDialogStore = create<EditWorkspaceDialogState>(
  (set) => ({
    isOpen: false,
    id: undefined,
    onOpen: (id) => set(() => ({ isOpen: true, id })),
    onClose: () => set(() => ({ isOpen: false, id: undefined })),
  })
);
