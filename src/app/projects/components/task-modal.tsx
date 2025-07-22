import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./task-form";

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Partial<IProject.Task>;
  users: IProject.User[];
  labels: string[];
  tasks: IProject.Task[];
  onSubmit: (values: Partial<IProject.Task>) => void;
  submitLabel?: string;
  title?: string;
}

export function TaskModal({
  open,
  onOpenChange,
  initial,
  users,
  labels,
  tasks,
  onSubmit,
  submitLabel = "Save",
  title = "Task",
}: TaskModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <TaskForm
          initial={initial}
          users={users}
          labels={labels}
          tasks={tasks}
          onSubmit={onSubmit}
          submitLabel={submitLabel}
        />
      </DialogContent>
    </Dialog>
  );
}
