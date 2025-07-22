import PageHeader from "@/components/page-header";
import { ProjectList } from "./components/project-list";
import { mockProjects } from "./utils/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProjectModal } from "./components/project-modal";

const Project = () => {
  const [projects, setProjects] = useState<IProject.Project[]>(mockProjects);
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
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (values: Partial<IProject.Project>) => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? { ...p, ...values } : p))
      );
    } else {
      setProjects((prev) => [
        ...prev,
        {
          ...values,
          id: (Math.max(0, ...prev.map((p) => Number(p.id))) + 1).toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          progress: { total_tasks: 0, completed_tasks: 0, percentage: 0 },
        } as IProject.Project,
      ]);
    }
    setModalOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage your projects"
        action={<Button onClick={handleCreate}>Create Project</Button>}
      />
      <ProjectList
        projects={projects}
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
      />
    </>
  );
};

export default Project;
