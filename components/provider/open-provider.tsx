import CreateProjectDialog from "../project/create-project-dialog";
import CreateTaskDialog from "../task/create-task-dialog";
import UpdateTaskDialog from "../task/update-task-dialog";
import CreateWorkspaceDialog from "../workspace/create-workspace-dialog";

export default function OpenProvider() {
  return (
    <>
      <CreateWorkspaceDialog />
      <CreateProjectDialog />
      <CreateTaskDialog />
      <UpdateTaskDialog />
    </>
  );
}
