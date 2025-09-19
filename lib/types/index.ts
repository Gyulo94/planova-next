export type { Workspace } from "./workspace";
export type { WorkspaceMember } from "./workspace-member";

export type OpenState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
