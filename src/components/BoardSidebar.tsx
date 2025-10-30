import { useState } from 'react';
import { Plus, Folder, Trash2 } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Board = Database['public']['Tables']['boards']['Row'];

interface BoardSidebarProps {
  boards: Board[];
  selectedBoard: Board | null;
  onSelectBoard: (board: Board) => void;
  onCreateBoard: (name: string) => Promise<void>;
  onDeleteBoard: (id: string) => Promise<void>;
}

export function BoardSidebar({
  boards,
  selectedBoard,
  onSelectBoard,
  onCreateBoard,
  onDeleteBoard
}: BoardSidebarProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;

    setIsLoading(true);
    try {
      await onCreateBoard(newBoardName.trim());
      setNewBoardName('');
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create board:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBoard = async (e: React.MouseEvent, boardId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this board? All tasks will be deleted.')) {
      try {
        await onDeleteBoard(boardId);
      } catch (error) {
        console.error('Failed to delete board:', error);
      }
    }
  };

  return (
    <div className="w-72 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Folder className="w-6 h-6" />
          Boards
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {boards.map((board) => (
          <div
            key={board.id}
            onClick={() => onSelectBoard(board)}
            className={`group flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
              selectedBoard?.id === board.id
                ? 'bg-blue-600'
                : 'hover:bg-slate-800'
            }`}
          >
            <span className="font-medium truncate">{board.name}</span>
            <button
              onClick={(e) => handleDeleteBoard(e, board.id)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 rounded transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        {isCreating ? (
          <form onSubmit={handleCreateBoard} className="space-y-2">
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Board name..."
              className="w-full px-3 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              disabled={isLoading}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoading || !newBoardName.trim()}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setNewBoardName('');
                }}
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Board
          </button>
        )}
      </div>
    </div>
  );
}
