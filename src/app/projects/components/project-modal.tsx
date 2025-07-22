import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectForm } from "./project-form";

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Partial<IProject.Project>;
  onSubmit: (values: Partial<IProject.Project>) => void;
  submitLabel?: string;
  title?: string;
}

export function ProjectModal({
  open,
  onOpenChange,
  initial,
  onSubmit,
  submitLabel = "Save",
  title = "Project",
}: ProjectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ProjectForm
          initial={initial}
          onSubmit={onSubmit}
          submitLabel={submitLabel}
        />
      </DialogContent>
    </Dialog>
  );
}
