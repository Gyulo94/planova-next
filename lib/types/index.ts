export type { Workspace } from "./workspace";

export type OpenState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
