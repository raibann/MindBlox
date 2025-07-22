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

interface TaskFormProps {
  initial?: Partial<IProject.Task>;
  users: IProject.User[];
  labels: string[];
  tasks: IProject.Task[];
  onSubmit: (values: Partial<IProject.Task>) => void;
  submitLabel?: string;
}

const priorities: IProject.Task["priority"][] = [
  "low",
  "medium",
  "high",
  "urgent",
];
const statuses: IProject.Task["status"][] = [
  "todo",
  "in-progress",
  "review",
  "done",
];

export function TaskForm({
  initial = {},
  users,
  labels,
  tasks,
  onSubmit,
  submitLabel = "Save",
}: TaskFormProps) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [assignee_id, setAssigneeId] = useState(initial.assignee_id || "");
  const [status, setStatus] = useState<IProject.Task["status"]>(
    initial.status || "todo"
  );
  const [priority, setPriority] = useState<IProject.Task["priority"]>(
    initial.priority || "medium"
  );
  const [due_date, setDueDate] = useState(
    initial.due_date ? initial.due_date.slice(0, 10) : ""
  );
  const [selectedLabels, setSelectedLabels] = useState<string[]>(
    initial.labels || []
  );
  const [subtasks, setSubtasks] = useState<IProject.SubTask[]>(
    initial.subtasks || []
  );
  const [dependencies, setDependencies] = useState<string[]>(
    initial.dependencies || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...initial,
      title,
      description,
      assignee_id,
      status,
      priority,
      due_date: due_date ? new Date(due_date).toISOString() : undefined,
      labels: selectedLabels,
      subtasks,
      dependencies,
    });
  };

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const addSubtask = () => {
    setSubtasks((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2), title: "", completed: false },
    ]);
  };

  const updateSubtask = (
    idx: number,
    key: keyof IProject.SubTask,
    value: boolean | string
  ) => {
    setSubtasks((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [key]: value } : s))
    );
  };

  const removeSubtask = (idx: number) => {
    setSubtasks((prev) => prev.filter((_, i) => i !== idx));
  };

  const toggleDependency = (taskId: string) => {
    setDependencies((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <Label htmlFor="assignee">Assignee</Label>
        <Select value={assignee_id} onValueChange={setAssigneeId}>
          <SelectTrigger id="assignee">
            <SelectValue placeholder="Select assignee" />
          </SelectTrigger>
          <SelectContent>
            {users.map((u) => (
              <SelectItem key={u.id} value={u.id}>
                {u.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v as IProject.Task["status"])}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select
          value={priority}
          onValueChange={(v) => setPriority(v as IProject.Task["priority"])}
        >
          <SelectTrigger id="priority">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="due_date">Deadline</Label>
        <Input
          id="due_date"
          type="date"
          value={due_date}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div>
        <Label>Labels</Label>
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <Button
              key={label}
              type="button"
              variant={selectedLabels.includes(label) ? "default" : "outline"}
              onClick={() => toggleLabel(label)}
              className="text-xs px-2 py-1"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label>Subtasks</Label>
        <div className="flex flex-col gap-2">
          {subtasks.map((sub, idx) => (
            <div key={sub.id} className="flex gap-2 items-center">
              <Input
                value={sub.title}
                onChange={(e) => updateSubtask(idx, "title", e.target.value)}
                placeholder={`Subtask ${idx + 1}`}
                className="flex-1"
              />
              <input
                type="checkbox"
                checked={sub.completed}
                onChange={(e) =>
                  updateSubtask(idx, "completed", e.target.checked)
                }
              />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                onClick={() => removeSubtask(idx)}
              >
                -
              </Button>
            </div>
          ))}
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addSubtask}
          >
            Add Subtask
          </Button>
        </div>
      </div>
      <div>
        <Label>Dependencies</Label>
        <div className="flex flex-wrap gap-2">
          {tasks
            .filter((t) => !initial.id || t.id !== initial.id)
            .map((t) => (
              <Button
                key={t.id}
                type="button"
                variant={dependencies.includes(t.id) ? "default" : "outline"}
                onClick={() => toggleDependency(t.id)}
                className="text-xs px-2 py-1"
              >
                {t.title}
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
