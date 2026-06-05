import { expect, APIRequestContext } from "@playwright/test";
import BasePayload from "./base.payload";
import {
  NoteCategory,
  NotePayload,
  NoteResponse,
  UpdateNotePayload,
} from "../types/note.types";
import fs from "fs";
import path from "path";

const NOTE_DIR = path.join(__dirname, "../playwright/.notes");
const NOTE_FILE = path.join(NOTE_DIR, "notes.json");

export default class NotesPayload extends BasePayload {
  constructor(request: APIRequestContext) {
    super(request);
  }

  buildCreateNotePayload(
    title: string,
    description: string,
    category: NoteCategory,
  ): NotePayload {
    return {
      title,
      description,
      category,
    };
  }

  private saveNote(note: NoteResponse): void {
    if (!fs.existsSync(NOTE_DIR)) {
      fs.mkdirSync(NOTE_DIR, { recursive: true });
    }

    fs.writeFileSync(NOTE_FILE, JSON.stringify(note, null, 2), "utf-8");
  }

  loadNote(): NoteResponse {
    if (!fs.existsSync(NOTE_FILE)) {
      throw new Error(`Note file not found: ${NOTE_FILE}`);
    }

    const raw = fs.readFileSync(NOTE_FILE, "utf-8");
    return JSON.parse(raw) as NoteResponse;
  }

  async createNote(token: string, payload: NotePayload): Promise<NoteResponse> {
    const response = await this.getRequest().post(
      `${process.env.API_URL}/notes`,
      {
        data: payload,
        headers: {
          "x-auth-token": token,
        },
      },
    );
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toEqual("Note successfully created");
    expect(responseBody.data).toHaveProperty("id");
    expect(responseBody.data).toHaveProperty("title", payload.title);
    expect(responseBody.data).toHaveProperty(
      "description",
      payload.description,
    );
    expect(responseBody.data).toHaveProperty("category", payload.category);

    // Save the note data to a JSON file for later use
    this.saveNote(responseBody.data);
    return responseBody.data;
  }

  async getNoteDetails(token: string, noteId: string): Promise<NoteResponse> {
    const response = await this.getRequest().get(
      `${process.env.API_URL}/notes/${noteId}`,
      {
        headers: {
          "x-auth-token": token,
        },
      },
    );

    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toEqual("Note successfully retrieved");

    return responseBody.data;
  }

  buildUpdateNotePayload(
    noteId: string,
    title: string,
    description: string,
    status: boolean,
    category: NoteCategory,
  ): UpdateNotePayload {
    return {
      id: noteId,
      title,
      description,
      completed: status,
      category,
    };
  }

  async updateNote(
    token: string,
    payload: UpdateNotePayload,
  ): Promise<NoteResponse> {
    const response = await this.getRequest().put(
      `${process.env.API_URL}/notes/${payload.id}`,
      {
        data: payload,
        headers: {
          "x-auth-token": token,
        },
      },
    );

    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toEqual("Note successfully Updated");

    return responseBody.data;
  }

  async deleteNote(token: string, noteId: string): Promise<void> {
    const response = await this.getRequest().delete(
      `${process.env.API_URL}/notes/${noteId}`,
      {
        headers: {
          "x-auth-token": token,
        },
      },
    );

    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toEqual("Note successfully deleted");
  }
}
