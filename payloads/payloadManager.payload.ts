import { APIRequestContext } from "@playwright/test";
import UserPayload from "./user.payload";
import NotesPayload from "./notes.payload";

export default class PayloadManager {
  private readonly request: APIRequestContext;
  private readonly userPayload: UserPayload;
  private readonly notesPayload: NotesPayload;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.userPayload = new UserPayload(this.request);
    this.notesPayload = new NotesPayload(this.request);
  }

    getUserPayload() {
      return this.userPayload;
    }

    getNotesPayload() {
      return this.notesPayload;
    }

}
