"use client"; // Add this directive for Client Component

import { useState, useEffect } from 'react';
import { Task } from './types';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

export default function Home() {
  const LOCAL_STORAGE_KEY = "timeManagementAppTasks";
  const [tasks, setTasks] = useState<Task[]>([]);

  // Effect to load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks) as Task[];
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
        // Optionally clear corrupted data
        // localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]); // Dependency array [tasks] ensures this runs when tasks change

  const handleAddTask = (taskData: { title: string; description?: string; dueDate?: string }) => {
    const newTask: Task = {
      id: Date.now().toString(), // Simple unique ID
      ...taskData,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <h1 className="text-2xl font-bold my-4 text-center sm:text-3xl">Công việc của tôi</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
