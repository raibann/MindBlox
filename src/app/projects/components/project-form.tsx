import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useProjectContext } from "@/contexts/ProjectContext";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarRange } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

// Zod schema for project validation
const projectSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Project title must be less than 100 characters"),
  description: z.string().optional(),
  status: z.string(),
  deadline: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional()
    .refine(
      (data) => data?.from && data?.to && data?.from < data?.to,
      "Deadline must be a valid date range"
    ),
  created_by: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initial?: IProject.Project;
  onSubmit?: (values: ProjectFormData) => void;
  submitLabel?: string;
  mode?: "create" | "edit";
}

const statusOptions: IProject.Project["status"][] = [
  "planning",
  "active",
  "completed",
  "on-hold",
];

const defaultValues: ProjectFormData = {
  title: "",
  description: "",
  status: "planning",
  deadline: undefined,
};

export function ProjectForm({
  initial,
  onSubmit,
  submitLabel = "Save",
  mode = "create",
}: ProjectFormProps) {
  const { addProject, updateProject } = useProjectContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initial
      ? {
          ...initial,
          deadline: initial.deadline
            ? {
                from: new Date(initial.deadline.from),
                to: new Date(initial.deadline.to),
              }
            : undefined,
        }
      : defaultValues,
  });

  const onFormSubmit = async (data: ProjectFormData) => {
    try {
      const projectData = {
        ...initial,
        title: data.title,
        description: data.description,
        status: data.status,
        deadline:
          data.deadline?.from && data.deadline?.to
            ? {
                from: new Date(data.deadline.from).toISOString(),
                to: new Date(data.deadline.to).toISOString(),
              }
            : undefined,
        created_by: data.created_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      if (mode === "create") {
        addProject(projectData as IProject.Project);
      } else if (initial?.id) {
        updateProject(initial.id, projectData as IProject.Project);
      }

      // Call custom onSubmit if provided
      if (onSubmit) {
        onSubmit(data);
      }

      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="space-y-3">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          {...register("title")}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>
      <div className="flex gap-4">
        <div className="space-y-3">
          <Label htmlFor="status">Status</Label>
          <Select
            value={watch("status")}
            onValueChange={(value) =>
              setValue("status", value as ProjectFormData["status"])
            }
          >
            <SelectTrigger
              id="status"
              className={errors.status ? "border-red-500" : ""}
            >
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
          {errors.status && (
            <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
          )}
        </div>

        <div className="space-y-3 grow">
          <Label htmlFor="deadline">Deadline</Label>
          <Popover modal>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="deadline"
                className="justify-between font-normal w-full mb-0"
              >
                {watch("deadline") &&
                watch("deadline")?.from &&
                watch("deadline")?.to
                  ? `${watch("deadline")?.from?.toLocaleDateString()} - ${watch(
                      "deadline"
                    )?.to?.toLocaleDateString()}`
                  : "Select date"}
                <CalendarRange />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="center"
            >
              <Calendar
                mode="range"
                selected={watch("deadline") as DateRange | undefined}
                captionLayout="dropdown"
                numberOfMonths={2}
                onSelect={(range) => {
                  setValue("deadline", range);
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.deadline && (
            <p className="text-sm text-red-500 mt-1">
              {errors.deadline.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
