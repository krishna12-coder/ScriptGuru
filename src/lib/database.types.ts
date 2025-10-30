export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      boards: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string
          status: 'To Do' | 'In Progress' | 'Done'
          priority: 'Low' | 'Medium' | 'High'
          assigned_to: string
          due_date: string | null
          board_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          status?: 'To Do' | 'In Progress' | 'Done'
          priority?: 'Low' | 'Medium' | 'High'
          assigned_to?: string
          due_date?: string | null
          board_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: 'To Do' | 'In Progress' | 'Done'
          priority?: 'Low' | 'Medium' | 'High'
          assigned_to?: string
          due_date?: string | null
          board_id?: string
          created_at?: string
        }
      }
    }
  }
}
