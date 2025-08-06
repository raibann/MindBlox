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
      from?: Date;
      to?: Date;
    };
  }

  interface Task {
    id: string;
    title: string;
    status: string;
    label: string;
    priority: string;
    deadline?: {
      from?: Date;
      to?: Date;
    };
  }
}
