import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import type { Database } from '../lib/database.types';

type Task = Database['public']['Tables']['tasks']['Row'];
type Board = Database['public']['Tables']['boards']['Row'];

interface BoardViewProps {
  board: Board;
  tasks: Task[];
  onCreateTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
}

const statusColumns: Array<Task['status']> = ['To Do', 'In Progress', 'Done'];

export function BoardView({
  board,
  tasks,
  onCreateTask,
  onEditTask,
  onDeleteTask,
  onStatusChange
}: BoardViewProps) {
  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="flex-1 bg-slate-50 overflow-hidden flex flex-col">
      <div className="bg-white border-b border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-900">{board.name}</h2>
          <button
            onClick={onCreateTask}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="h-full min-w-max">
          <div className="grid grid-cols-3 gap-6 p-6 h-full">
            {statusColumns.map((status) => {
              const columnTasks = getTasksByStatus(status);
              return (
                <div key={status} className="flex flex-col min-w-[320px]">
                  <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
                    <h3 className="font-semibold text-slate-900 flex items-center justify-between">
                      <span>{status}</span>
                      <span className="text-sm bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        {columnTasks.length}
                      </span>
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3">
                    {columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onStatusChange={onStatusChange}
                      />
                    ))}
                    {columnTasks.length === 0 && (
                      <div className="text-center py-8 text-slate-400">
                        No tasks
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
