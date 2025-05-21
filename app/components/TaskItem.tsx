import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  return (
    <li
      className={`border p-3 rounded mb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center ${
        task.isCompleted ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div className="flex items-center mb-2 sm:mb-0">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleComplete(task.id)}
          className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400 mr-3"
        />
        <div className={task.isCompleted ? 'text-gray-400 line-through' : ''}>
          <h3 className={`font-semibold ${task.isCompleted ? '' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm ${task.isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <p className={`text-xs mt-1 ${task.isCompleted ? 'text-gray-400' : 'text-gray-500'}`}>
              Hạn chót: {task.dueDate}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 text-white p-1 px-3 rounded hover:bg-red-600 text-xs self-end sm:self-center"
      >
        Xóa
      </button>
    </li>
  );
}
