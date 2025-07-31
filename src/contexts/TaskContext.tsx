/* eslint-disable react-refresh/only-export-components */
// context/ProductContext.tsx

import { createContext, useContext, useState, type ReactNode } from "react";
import { dataTasks } from "@/app/projects/pages/tasks/data/data";

interface TaskContextType {
  tasks: IProject.Task[];
  addTask: (task: IProject.Task) => void;
  updateTask: (id: string, task: Partial<IProject.Task>) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const InitialTasks: IProject.Task[] = dataTasks || [];
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<IProject.Task[]>(InitialTasks);

  const addTask = (task: IProject.Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (id: string, newData: Partial<IProject.Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...newData } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
