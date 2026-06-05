export type NoteCategory = "Work" | "Personal" | "Home";

export interface NotePayload {
  title: string;
  description: string;
  category: NoteCategory;
}

export interface NoteResponse {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  category: string;
  user_id: string;
}

export interface UpdateNotePayload {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: NoteCategory;
}
