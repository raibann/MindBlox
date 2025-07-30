import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BadgeAlert,
  CalendarRange,
  Check,
  Clock,
  EllipsisVerticalIcon,
  Eye,
  FileText,
  ListTodo,
  PencilIcon,
  PlugZap,
  TrashIcon,
  Users,
  Workflow,
} from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/lib/route-path";

interface ProjectListProps {
  projects: IProject.Project[];
  onEdit?: (project: IProject.Project) => void;
  onDelete?: (id: string) => void;
}

export function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  const navigate = useNavigate();
  const getStatusColor = (status: IProject.Project["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "planning":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Clock className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No projects yet
        </h3>
        <p className="text-gray-600 mb-4">
          Get started by creating your first project
        </p>
      </div>
    );
  }
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 2000)
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </CardDescription>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVerticalIcon className="size-4 text-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-48">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(
                        ROUTE_PATH.project.details.replace(":id", project.id)
                      );
                    }}
                  >
                    <Eye className="size-4 text-foreground" /> View
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      onEdit?.(project);
                    }}
                  >
                    <PencilIcon className="size-4 text-foreground" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <PlugZap className="size-4 mr-1" />
                      Integrate
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(
                              ROUTE_PATH.project.tasks.replace(
                                ":id",
                                project.id
                              )
                            )
                          }
                        >
                          <ListTodo className="size-4 text-foreground" />
                          Tasks
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(
                              ROUTE_PATH.project.documents.replace(
                                ":id",
                                project.id
                              )
                            )
                          }
                        >
                          <FileText className="size-4 text-foreground" />
                          Documents
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(
                              ROUTE_PATH.project.uml.replace(":id", project.id)
                            )
                          }
                        >
                          <Workflow className="size-4 text-foreground" />
                          UML Diagram
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(
                              ROUTE_PATH.project.issues.replace(
                                ":id",
                                project.id
                              )
                            )
                          }
                        >
                          <BadgeAlert className="size-4 text-foreground" />
                          Issues
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Users className="size-4 text-foreground" />
                    Team
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      toast("Are you sure you want to delete this project?", {
                        action: {
                          label: <Check size={16} />,
                          onClick: () => {
                            onDelete?.(project.id);
                            toast.promise(promise, {
                              loading: "Loading...",
                              success: () => {
                                return `Project has been deleted.`;
                              },
                              error: "Error",
                              richColors: true,
                            });
                          },
                        },
                        closeButton: true,
                      });
                    }}
                  >
                    <TrashIcon className="size-4 text-foreground" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <CalendarRange size={16} />
              <span className="text-sm text-muted-foreground">
                {project.deadline?.from && project.deadline?.to
                  ? `${new Date(
                      project.deadline?.from
                    ).toLocaleDateString()} - ${new Date(
                      project.deadline?.to
                    ).toLocaleDateString()}`
                  : "No deadline"}
              </span>
            </div>
            <CardDescription>{project.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
