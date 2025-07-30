/* eslint-disable react-refresh/only-export-components */
// context/ProductContext.tsx

import { createContext, useContext, useState, type ReactNode } from "react";

interface ProjectContextType {
  projects: IProject.Project[];
  addProject: (project: IProject.Project) => void;
  updateProject: (id: string, project: Partial<IProject.Project>) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const InitialProjects: IProject.Project[] = [
  {
    id: new Date().getTime().toString(),
    title: "Project 1",
    description: "Description 1",
    status: "active",
    created_by: "John Doe",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deadline: {
      from: new Date().toISOString(),
      to: new Date().toISOString(),
    },
  },
];

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<IProject.Project[]>(InitialProjects);

  const addProject = (project: IProject.Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (id: string, newData: Partial<IProject.Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...newData } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProjectContext must be used within ProjectProvider");
  return context;
};
