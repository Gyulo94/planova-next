import CreateProjectDialog from "../project/create-project-dialog";
import CreateWorkspaceDialog from "../workspace/create-workspace-dialog";

export default function OpenProvider() {
  return (
    <>
      <CreateWorkspaceDialog />
      <CreateProjectDialog />
    </>
  );
}
