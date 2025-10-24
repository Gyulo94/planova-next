import { create } from "zustand";
import { OpenState } from "../types";

interface OpenUserDialogState extends OpenState {
  id?: string;
  onOpen: (id?: string) => void;
}

export const useOpenUserDialogStore = create<OpenUserDialogState>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen: (id) => set(() => ({ isOpen: true, id })),
  onClose: () => set(() => ({ isOpen: false, id: undefined })),
}));
