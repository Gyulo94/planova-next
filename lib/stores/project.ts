import { create } from "zustand";
import { OpenState, Project } from "../types";

interface ProjectDialogState extends OpenState {
  workspaceId?: string;
  onOpen: (workspaceId?: string) => void;
}

export const useOpenProjectDialogStore = create<ProjectDialogState>((set) => ({
  isOpen: false,
  onOpen: (workspaceId) => set(() => ({ isOpen: true, workspaceId })),
  onClose: () => set(() => ({ isOpen: false })),
}));

interface ProjectState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export const useProjects = create<ProjectState>((set, get) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}));
