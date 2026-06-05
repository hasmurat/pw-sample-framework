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
    const noteDir = path.join(__dirname, "../playwright/.user");

    if (!fs.existsSync(noteDir)) {
      fs.mkdirSync(noteDir, { recursive: true });
    }

    const notePath = path.join(noteDir, "notes.json");

    fs.writeFileSync(
      notePath,
      JSON.stringify(responseBody.data, null, 2),
      "utf-8",
    );
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

  async updateNote(token: string, payload: UpdateNotePayload): Promise<NoteResponse> {
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
