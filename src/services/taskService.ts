// We are keeping the original Supabase types to ensure that App.tsx
// and other components continue to work without any modifications.
import type { Database } from '../lib/database.types';

type Task = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
type TaskUpdate = Database['public']['Tables']['tasks']['Update'];

// The URL of your new Node.js/Express server
const API_URL = 'http://localhost:5001/api';

export const taskService = {
  /**
   * Fetches all tasks for a specific board from the Express API.
   */
  async getTasksByBoard(boardId: string): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks/${boardId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  /**
   * Creates a new task by sending a POST request to the Express API.
   */
  async createTask(task: TaskInsert): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  },

  /**
   * Updates an existing task by sending a PATCH request to the Express API.
   */
  async updateTask(id: string, updates: TaskUpdate): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      // The server expects the updates to be nested in an 'updates' object
      body: JSON.stringify({ updates }),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  },

  /**
   * Deletes a task by sending a DELETE request to the Express API.
   */
  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },
};