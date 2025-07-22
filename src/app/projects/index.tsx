import PageHeader from "@/components/page-header";
import { ProjectList } from "./components/project-list";
import { mockProjects } from "./utils/data";
import { Button } from "@/components/ui/button";

const Project = () => {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage your projects"
        action={<Button>Create Project</Button>}
      />
      <ProjectList projects={mockProjects} />
    </>
  );
};

export default Project;
