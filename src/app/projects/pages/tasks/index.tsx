import PageHeader from "@/components/page-header";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useTaskContext } from "@/contexts/TaskContext";
import { useState } from "react";
import TaskForm from "./components/task-form";

export default function TaskPage() {
  const { tasks } = useTaskContext();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 flex-1 h-full">
      <PageHeader title="Tasks" description="Manage your tasks" isBack />
      <DataTable
        columns={columns}
        data={tasks}
        onAddTask={() => setOpen(true)}
      />
      <TaskForm task={tasks[0]} open={open} onOpenChange={setOpen} />
    </div>
  );
}
