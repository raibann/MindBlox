import { useParams } from "react-router";
import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookType, Layers2 } from "lucide-react";
import { useState } from "react";
import { mockTasks, mockUsers, mockLabels } from "../utils/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskModal } from "../components/task-modal";
import { DatabaseSchemaNodeFlow } from "../components/database-schema-node-flow";
import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
} from "reactflow";
import "reactflow/dist/style.css";

const TASK_STATUSES = ["todo", "in-progress", "review", "done"];

const tabs = [
  {
    name: "Overview",
    icon: BookType,
    value: "overview",
  },
  {
    name: "Task",
    value: "task",
    icon: Layers2,
  },
  {
    name: "Database",
    value: "database",
    icon: Layers2,
  },
];

const ProjectDetails = () => {
  const param = useParams();
  const projectId = param.id;
  const [tasks, setTasks] = useState(
    mockTasks.filter((t) => t.project_id === projectId)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<IProject.Task | null>(null);

  // Database Schema Node Management State
  const [dbNodes, , onDbNodesChange] = useNodesState([
    {
      id: "table-1",
      type: "databaseSchemaNode",
      position: { x: 100, y: 100 },
      data: {
        tableName: "users",
        columns: [
          { name: "id", type: "uuid", primary: true },
          { name: "email", type: "varchar", primary: false },
        ],
      },
    },
  ]);
  const [dbEdges, setDbEdges, onDbEdgesChange] = useEdgesState([]);
  const nodeTypes = React.useMemo(
    () => ({ databaseSchemaNode: DatabaseSchemaNodeFlow }),
    []
  );

  const handleCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task: IProject.Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = (values: Partial<IProject.Task>) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...values } : t))
      );
    } else {
      setTasks((prev) => [
        ...prev,
        {
          ...values,
          id: Math.random().toString(36).slice(2),
          project_id: projectId || "",
          status: values.status || "todo",
          priority: values.priority || "medium",
          subtasks: values.subtasks || [],
          labels: values.labels || [],
          dependencies: values.dependencies || [],
        } as IProject.Task,
      ]);
    }
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Project Details" isBack />
      <Tabs
        orientation="vertical"
        defaultValue={"task"}
        className="flex-1 w-full flex flex-row items-start gap-4 justify-start"
      >
        <TabsList className="shrink-0 grid grid-cols-1 h-auto w-fit gap-1 bg-background rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="py-1.5 cursor-pointer justify-start text-start text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <tab.icon className="size-4" />
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="h-full flex items-center justify-center w-full font-medium text-muted-foreground border-l">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="flex items-center justify-center h-full w-full"
            >
              {tab.value === "overview" ? (
                <div className="w-full p-8 text-muted-foreground text-center">
                  Project overview coming soon.
                </div>
              ) : tab.value === "task" ? (
                <div className="flex flex-col gap-4 w-full">
                  <div className="mb-2">
                    <Button onClick={handleCreate}>Create Task</Button>
                  </div>
                  <div className="flex gap-4 w-full overflow-x-auto">
                    {TASK_STATUSES.map((status) => (
                      <div key={status} className="flex-1 min-w-[250px]">
                        <h3 className="text-base font-semibold mb-2 capitalize">
                          {status.replace("-", " ")}
                        </h3>
                        <div className="flex flex-col gap-3">
                          {tasks
                            .filter((t) => t.status === status)
                            .map((task) => (
                              <Card key={task.id} className="shadow-sm">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm mb-1 line-clamp-1">
                                    {task.title}
                                  </CardTitle>
                                  <div className="flex gap-1 flex-wrap">
                                    {task.labels.map((label) => (
                                      <Badge
                                        key={label}
                                        variant="outline"
                                        className="text-xs px-1.5"
                                      >
                                        {label}
                                      </Badge>
                                    ))}
                                  </div>
                                </CardHeader>
                                <CardContent className="flex items-center gap-2 pt-0">
                                  {task.assignee && (
                                    <img
                                      src={task.assignee.avatar}
                                      alt={task.assignee.name}
                                      className="w-6 h-6 rounded-full"
                                    />
                                  )}
                                  <span className="text-xs text-muted-foreground line-clamp-1">
                                    {task.assignee?.name}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleEdit(task);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleDelete(task.id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <TaskModal
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    initial={editingTask || undefined}
                    users={mockUsers}
                    labels={mockLabels}
                    tasks={tasks}
                    onSubmit={handleSubmit}
                    submitLabel={editingTask ? "Update" : "Create"}
                    title={editingTask ? "Edit Task" : "Create Task"}
                  />
                </div>
              ) : tab.value === "database" ? (
                <div className="w-full h-[600px] bg-muted rounded-lg">
                  <ReactFlow
                    nodes={dbNodes}
                    edges={dbEdges}
                    onNodesChange={onDbNodesChange}
                    onEdgesChange={onDbEdgesChange}
                    onConnect={(params: Connection) =>
                      setDbEdges((eds: Edge[]) => addEdge(params, eds))
                    }
                    nodeTypes={nodeTypes}
                    fitView
                  >
                    <MiniMap />
                    <Controls />
                    <Background gap={16} size={1} />
                  </ReactFlow>
                </div>
              ) : (
                <span>{tab.name} Content</span>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
