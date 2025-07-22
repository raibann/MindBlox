declare namespace IProject {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: "owner" | "editor" | "viewer";
  }

  interface Project {
    id: string;
    name: string;
    description?: string;
    status: "planning" | "active" | "completed" | "on-hold";
    created_by: string;
    created_at: string;
    updated_at: string;
    deadline?: string;
    members: ProjectMember[];
    progress: {
      total_tasks: number;
      completed_tasks: number;
      percentage: number;
    };
  }

  interface ProjectMember {
    user_id: string;
    project_id: string;
    role: "owner" | "editor" | "viewer";
    joined_at: string;
    user: User;
  }

  interface Block {
    id: string;
    project_id: string;
    name: string;
    description?: string;
    owner_id: string;
    created_at: string;
    updated_at: string;
    contents: BlockContent[];
    owner: User;
  }

  type BlockContentType = "doc" | "task" | "db-design" | "flowchart" | "issue";

  type BlockContentData = Doc | Task | DBDesign | FlowChart | Issue;

  interface BlockContent {
    id: string;
    block_id: string;
    type: BlockContentType;
    title: string;
    data: BlockContentData;
    created_by: string;
    created_at: string;
    updated_at: string;
    creator: User;
  }

  interface Doc {
    content: string;
    format: "markdown" | "rich-text";
  }

  interface Task {
    id: string;
    project_id: string;
    title: string;
    description?: string;
    assignee_id?: string;
    status: "todo" | "in-progress" | "review" | "done";
    priority: "low" | "medium" | "high" | "urgent";
    due_date?: string;
    subtasks: SubTask[];
    assignee?: User;
    labels: string[];
    dependencies: string[];
  }

  interface SubTask {
    id: string;
    title: string;
    completed: boolean;
  }

  interface DBDesign {
    tables: DBTable[];
    relationships: DBRelationship[];
  }

  interface DBTable {
    id: string;
    name: string;
    columns: DBColumn[];
    x: number;
    y: number;
  }

  interface DBColumn {
    name: string;
    type: string;
    nullable: boolean;
    primary_key: boolean;
    foreign_key?: string;
  }

  interface DBRelationship {
    from_table: string;
    to_table: string;
    from_column: string;
    to_column: string;
    type: "one-to-one" | "one-to-many" | "many-to-many";
  }

  interface FlowChart {
    nodes: FlowNode[];
    edges: FlowEdge[];
  }

  interface FlowNode {
    id: string;
    type: "start" | "process" | "decision" | "end";
    label: string;
    x: number;
    y: number;
  }

  interface FlowEdge {
    id: string;
    from: string;
    to: string;
    label?: string;
  }

  interface Issue {
    title: string;
    description: string;
    status: "open" | "in-progress" | "resolved" | "closed";
    priority: "low" | "medium" | "high" | "critical";
    assignee_id?: string;
    labels: string[];
    comments: IssueComment[];
    assignee?: User;
  }

  interface IssueComment {
    id: string;
    author_id: string;
    content: string;
    created_at: string;
    author: User;
  }

  interface BrainstormNode {
    id: string;
    title: string;
    description: string;
    x: number;
    y: number;
    type: "idea" | "feature" | "task" | "note";
    color: string;
    connections: string[];
  }
}
