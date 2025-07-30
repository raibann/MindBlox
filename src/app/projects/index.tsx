import PageHeader from "@/components/page-header";
import { ProjectList } from "./components/project-list";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProjectModal } from "./components/project-modal";
import { useProjectContext } from "@/contexts/ProjectContext";

const Project = () => {
  const { projects, deleteProject } = useProjectContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<IProject.Project | null>(
    null
  );

  const handleCreate = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleEdit = (project: IProject.Project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
  };

  const handleSubmit = (values: unknown) => {
    // Additional actions can be performed here if needed
    console.log("Project submitted:", values);
  };

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage your projects"
        action={<Button onClick={handleCreate}>Create Project</Button>}
      />
      <ProjectList
        projects={projects as IProject.Project[]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProjectModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initial={editingProject || undefined}
        onSubmit={handleSubmit}
        submitLabel={editingProject ? "Update" : "Create"}
        title={editingProject ? "Edit Project" : "Create Project"}
        mode={editingProject ? "edit" : "create"}
      />
    </>
  );
};

export default Project;
