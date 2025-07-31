declare namespace IProject {
  interface Project {
    id: string;
    title: string;
    description?: string;
    status: string;
    created_by?: string;
    created_at?: string;
    updated_at?: string;
    deadline?: {
      from: string;
      to: string;
    };
  }

  interface Task {
    id: string;
    title: string;
    status: string;
    label: string;
    priority: string;
  }
}
