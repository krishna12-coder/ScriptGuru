// Note: We are keeping the Supabase types for now to avoid changes in App.tsx
// and other components. In a real-world scenario, you might create new, simpler types.
import type { Database } from '../lib/database.types';

type Board = Database['public']['Tables']['boards']['Row'];
type BoardInsert = Database['public']['Tables']['boards']['Insert'];

// The URL of your new Node.js/Express server
const API_URL = 'http://localhost:5001/api';

export const boardService = {
  /**
   * Fetches all boards from the Express API.
   */
  async getBoards(): Promise<Board[]> {
    const response = await fetch(`${API_URL}/boards`);
    if (!response.ok) {
      throw new Error('Failed to fetch boards');
    }
    return response.json();
  },

  /**
   * Creates a new board by sending a POST request to the Express API.
   */
  async createBoard(board: BoardInsert): Promise<Board> {
    const response = await fetch(`${API_URL}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(board),
    });
    if (!response.ok) {
      throw new Error('Failed to create board');
    }
    return response.json();
  },

  /**
   * Deletes a board by sending a DELETE request to the Express API.
   */
  async deleteBoard(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/boards/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete board');
    }
  },
};