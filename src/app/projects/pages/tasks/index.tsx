import PageHeader from "@/components/page-header";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useTaskContext } from "@/contexts/TaskContext";
import { useState } from "react";
import TaskForm from "./components/task-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { taskSchema, type TaskSchema } from "./data/schema";
import { labels, priorities, statuses } from "./data/data";
import { faker } from "@faker-js/faker";

export default function TaskPage() {
  // states
  const { tasks } = useTaskContext();
  const [open, setOpen] = useState(false);

  // hooks
  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: faker.lorem.words(3),
      status: faker.helpers.arrayElement(statuses).value,
      label: faker.helpers.arrayElement(labels).value,
      priority: faker.helpers.arrayElement(priorities).value,
      deadline: {
        from: faker.date.recent(),
        to: faker.date.future(),
      },
    },
  });

  return (
    <div className="flex flex-col gap-4 flex-1 h-full">
      <PageHeader title="Tasks" description="Manage your tasks" isBack />
      <DataTable
        columns={columns}
        data={tasks}
        onAddTask={() => setOpen(true)}
      />
      <Form {...form}>
        <TaskForm open={open} onOpenChange={setOpen} />
      </Form>
    </div>
  );
}
