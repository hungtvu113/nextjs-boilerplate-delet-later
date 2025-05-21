import { useState } from 'react';

interface AddTaskFormProps {
  onAddTask: (taskData: { title: string; description?: string; dueDate?: string }) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // Basic validation: title is required
    onAddTask({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          Tiêu đề:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Mô tả (tùy chọn):
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="dueDate" className="block mb-1 font-medium">
          Ngày hết hạn (tùy chọn):
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full sm:w-auto"
      >
        Thêm công việc
      </button>
    </form>
  );
}
