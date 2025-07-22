import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockUsers } from "../utils/data";

/**
 * @typedef {import('../../../@types/project').IProject} IProject
 */

interface ProjectFormProps {
  initial?: Partial<IProject.Project>;
  onSubmit: (values: Partial<IProject.Project>) => void;
  submitLabel?: string;
}

const statusOptions: IProject.Project["status"][] = [
  "planning",
  "active",
  "completed",
  "on-hold",
];

export function ProjectForm({
  initial = {},
  onSubmit,
  submitLabel = "Save",
}: ProjectFormProps) {
  const [name, setName] = useState(initial.name || "");
  const [description, setDescription] = useState(initial.description || "");
  const [status, setStatus] = useState<IProject.Project["status"]>(
    initial.status || "planning"
  );
  const [deadline, setDeadline] = useState(
    initial.deadline ? initial.deadline.slice(0, 10) : ""
  );
  const [members, setMembers] = useState<IProject.User[]>(
    initial.members?.map((m: IProject.ProjectMember) => m.user) || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...initial,
      name,
      description,
      status,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      members: members.map((user) => ({
        user_id: user.id,
        project_id: initial.id || "", // will be set by parent
        role: user.role,
        joined_at: new Date().toISOString(),
        user,
      })),
    });
  };

  const toggleMember = (user: IProject.User) => {
    setMembers((prev) =>
      prev.find((m) => m.id === user.id)
        ? prev.filter((m) => m.id !== user.id)
        : [...prev, user]
    );
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v as IProject.Project["status"])}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div>
        <Label>Members</Label>
        <div className="flex flex-wrap gap-2">
          {mockUsers.map((user) => (
            <Button
              key={user.id}
              type="button"
              variant={
                members.find((m) => m.id === user.id) ? "default" : "outline"
              }
              onClick={() => toggleMember(user)}
              className="flex items-center gap-2 px-2 py-1 text-xs"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-5 h-5 rounded-full"
              />
              {user.name}
              <span className="text-muted-foreground">({user.role})</span>
            </Button>
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full mt-2">
        {submitLabel}
      </Button>
    </form>
  );
}
