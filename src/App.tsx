import { useState, useEffect } from 'react';
import { BoardSidebar } from './components/BoardSidebar';
import { BoardView } from './components/BoardView';
import { TaskModal } from './components/TaskModal';
import { boardService } from './services/boardService';
import { taskService } from './services/taskService';
import type { Database } from './lib/database.types';

type Board = Database['public']['Tables']['boards']['Row'];
type Task = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];

function App() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBoards();
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      loadTasks(selectedBoard.id);
    }
  }, [selectedBoard]);

  const loadBoards = async () => {
    try {
      const data = await boardService.getBoards();
      setBoards(data);
      if (data.length > 0 && !selectedBoard) {
        setSelectedBoard(data[0]);
      }
    } catch (error) {
      console.error('Failed to load boards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTasks = async (boardId: string) => {
    try {
      const data = await taskService.getTasksByBoard(boardId);
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const handleCreateBoard = async (name: string) => {
    const newBoard = await boardService.createBoard({ name });
    setBoards([newBoard, ...boards]);
    setSelectedBoard(newBoard);
  };

  const handleDeleteBoard = async (id: string) => {
    await boardService.deleteBoard(id);
    const updatedBoards = boards.filter(b => b.id !== id);
    setBoards(updatedBoards);
    if (selectedBoard?.id === id) {
      setSelectedBoard(updatedBoards.length > 0 ? updatedBoards[0] : null);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = async (taskData: TaskInsert | { id: string; updates: Partial<Task> }) => {
    if ('id' in taskData) {
      const updatedTask = await taskService.updateTask(taskData.id, taskData.updates);
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    } else {
      const newTask = await taskService.createTask(taskData);
      setTasks([newTask, ...tasks]);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    await taskService.deleteTask(taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    const updatedTask = await taskService.updateTask(taskId, { status: newStatus });
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-lg text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <BoardSidebar
        boards={boards}
        selectedBoard={selectedBoard}
        onSelectBoard={setSelectedBoard}
        onCreateBoard={handleCreateBoard}
        onDeleteBoard={handleDeleteBoard}
      />

      {selectedBoard ? (
        <BoardView
          board={selectedBoard}
          tasks={tasks}
          onCreateTask={handleCreateTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <div className="flex-1 bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Boards Yet</h2>
            <p className="text-slate-600">Create your first board to get started</p>
          </div>
        </div>
      )}

      {selectedBoard && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          boardId={selectedBoard.id}
          editingTask={editingTask}
        />
      )}
    </div>
  );
}

export default App;
