import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFormContext } from "react-hook-form";
import type { TaskSchema } from "../data/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarRange } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { labels, priorities, statuses } from "../data/data";
import { useTaskContext } from "@/contexts/TaskContext";
import { faker } from "@faker-js/faker";

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskForm = ({ open, onOpenChange }: TaskFormProps) => {
  // form context
  const formContext = useFormContext<TaskSchema>();
  const { addTask } = useTaskContext();

  // handlers
  const onSubmit = (data: TaskSchema) => {
    // console.log("data", data);
    addTask({
      id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
      title: data.title,
      status: data.status,
      label: data.label,
      priority: data.priority,
      deadline: {
        from: data.deadline?.from,
        to: data.deadline?.to,
      },
    });
    onOpenChange(false);
  };

  // render
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-auto md:max-w-lg md:min-w-fit md:max-h-[calc(100dvh-2rem)] md:top-4 md:right-4 md:rounded-xl">
        <form
          onSubmit={formContext.handleSubmit(onSubmit, (e) => console.log(e))}
          className="flex flex-col gap-4 h-full p-4"
        >
          <SheetHeader>
            <SheetTitle>Add New Task</SheetTitle>
            <SheetDescription>Add a new task to your project.</SheetDescription>
          </SheetHeader>

          <FormField
            control={formContext.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={formContext.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="deadline"
                        className="justify-between font-normal w-full mb-0"
                      >
                        {field.value && field.value?.from && field.value?.to
                          ? `${field.value?.from?.toLocaleDateString()} - ${field.value?.to?.toLocaleDateString()}`
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
                        selected={field.value as DateRange | undefined}
                        captionLayout="dropdown"
                        numberOfMonths={2}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          <div className="flex items-center gap-2">
                            {status.icon && (
                              <status.icon className="text-muted-foreground size-4" />
                            )}
                            <span>{status.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a label" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {labels.map((label) => (
                        <SelectItem key={label.value} value={label.value}>
                          <div className="flex items-center gap-2">
                            <span>{label.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContext.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <span>{priority.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SheetFooter className="p-0">
            <Button type="submit">Create Task</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default TaskForm;
