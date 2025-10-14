export type { Project } from "./project";
export type { Task, TaskFilterOptions } from "./task";
export type { Workspace } from "./workspace";
export type { WorkspaceMember } from "./workspace-member";

export type OpenState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
