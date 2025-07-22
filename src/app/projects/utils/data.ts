// Mock data
const mockProjects: IProject.Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Building a modern e-commerce platform with React and Node.js",
    status: "active",
    created_by: "1",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-21T14:30:00Z",
    members: [],
    progress: {
      total_tasks: 24,
      completed_tasks: 18,
      percentage: 75,
    },
  },
  {
    id: "2",
    name: "Mobile App Redesign",
    description:
      "Complete redesign of our mobile application with new UX patterns",
    status: "planning",
    created_by: "1",
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-01-20T16:45:00Z",
    members: [],
    progress: {
      total_tasks: 12,
      completed_tasks: 3,
      percentage: 25,
    },
  },
];

export { mockProjects };
