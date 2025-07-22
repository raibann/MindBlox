import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router";
import { ROUTE_PATH } from "@/lib/route-path";

interface ProjectListProps {
  projects: IProject.Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="hover:shadow-lg transition-shadow cursor-pointer"
        >
          <Link to={ROUTE_PATH.project.details.replace(":id", project.id)}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">
                    {project.progress.percentage}%
                  </span>
                </div>
                <Progress value={project.progress.percentage} className="h-2" />
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>{project.progress.completed_tasks} completed</span>
                  <span>{project.progress.total_tasks} total tasks</span>
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Updated {formatDate(project.updated_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{project.members.length} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {project.progress.completed_tasks} tasks completed
                  </span>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
