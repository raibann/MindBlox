// Mock data
const mockUsers: IProject.User[] = [
  {
    id: "1",
    name: "Alice Smith",
    email: "alice@example.com",
    avatar: "/avatars/alice.jpg",
    role: "owner",
  },
  {
    id: "2",
    name: "Bob Johnson",
    email: "bob@example.com",
    avatar: "/avatars/bob.jpg",
    role: "editor",
  },
  {
    id: "3",
    name: "Carol Lee",
    email: "carol@example.com",
    avatar: "/avatars/carol.jpg",
    role: "viewer",
  },
];

const mockProjects: IProject.Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Building a modern e-commerce platform with React and Node.js",
    status: "active",
    created_by: "1",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-21T14:30:00Z",
    deadline: "2024-07-31T23:59:59Z",
    members: [
      {
        user_id: "1",
        project_id: "1",
        role: "owner",
        joined_at: "2024-01-15T10:00:00Z",
        user: mockUsers[0],
      },
      {
        user_id: "2",
        project_id: "1",
        role: "editor",
        joined_at: "2024-01-16T09:00:00Z",
        user: mockUsers[1],
      },
    ],
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
    deadline: "2024-08-15T23:59:59Z",
    members: [
      {
        user_id: "1",
        project_id: "2",
        role: "owner",
        joined_at: "2024-01-10T09:00:00Z",
        user: mockUsers[0],
      },
      {
        user_id: "3",
        project_id: "2",
        role: "viewer",
        joined_at: "2024-01-12T11:00:00Z",
        user: mockUsers[2],
      },
    ],
    progress: {
      total_tasks: 12,
      completed_tasks: 3,
      percentage: 25,
    },
  },
];

const mockLabels: string[] = [
  "Frontend",
  "Backend",
  "Bug",
  "Feature",
  "Urgent",
];

const mockTasks: IProject.Task[] = [
  {
    id: "t1",
    project_id: "1",
    title: "Set up project repo",
    description: "Initialize the repository and set up CI/CD.",
    assignee_id: "1",
    status: "done",
    priority: "high",
    due_date: "2024-06-30T23:59:59Z",
    labels: ["Backend"],
    subtasks: [
      { id: "st1", title: "Create repo", completed: true },
      { id: "st2", title: "Set up CI", completed: true },
    ],
    dependencies: [],
    assignee: mockUsers[0],
  },
  {
    id: "t2",
    project_id: "1",
    title: "Design product page",
    description: "Create wireframes for the product page.",
    assignee_id: "2",
    status: "in-progress",
    priority: "medium",
    due_date: "2024-07-10T23:59:59Z",
    labels: ["Frontend", "Feature"],
    subtasks: [
      { id: "st3", title: "Wireframe layout", completed: false },
      { id: "st4", title: "Review with team", completed: false },
    ],
    dependencies: ["t1"],
    assignee: mockUsers[1],
  },
  {
    id: "t3",
    project_id: "2",
    title: "User research interviews",
    description: "Interview 5 users for feedback.",
    assignee_id: "3",
    status: "todo",
    priority: "urgent",
    due_date: "2024-07-05T23:59:59Z",
    labels: ["Feature", "Urgent"],
    subtasks: [
      { id: "st5", title: "Prepare questions", completed: false },
      { id: "st6", title: "Schedule calls", completed: false },
    ],
    dependencies: [],
    assignee: mockUsers[2],
  },
];

export { mockProjects, mockUsers, mockTasks, mockLabels };
