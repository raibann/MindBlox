import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectForm, type ProjectFormData } from "./project-form";

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: IProject.Project;
  onSubmit?: (values: ProjectFormData) => void;
  submitLabel?: string;
  title?: string;
  mode?: "create" | "edit";
}

export function ProjectModal({
  open,
  onOpenChange,
  initial,
  onSubmit,
  submitLabel = "Save",
  title = "Project",
  mode = "create",
}: ProjectModalProps) {
  const handleSubmit = (values: ProjectFormData) => {
    // Call the custom onSubmit if provided
    if (onSubmit) {
      onSubmit(values);
    }
    // Close the modal after submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ProjectForm
          initial={initial}
          onSubmit={handleSubmit}
          submitLabel={submitLabel}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
}
