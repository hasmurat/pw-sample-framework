/**
 * Description: This file contains API tests for the Notes application, covering note creation, retrieval, and updating functionalities.
 * The tests are designed to run in a serial manner to ensure that the user registration and note creation steps are completed before subsequent tests are executed.
 * Serial manner is not recommended for large test suites, but it is used here for simplicity and to ensure that the necessary data is available for each test.
 * Each test validates the API responses and ensures that the expected data is returned, while also saving relevant data to JSON files for later use in other tests.
 */

import { test } from "../../testOptions";
import { expect } from "@playwright/test";
import { createRandomNote } from "../../utils/faker";
import { User } from "../../types/user.types";

let token: string;
let registeredUser: User;

test.describe.serial("API tests", () => {
  test.beforeAll(async ({ payloadManager }) => {
    await payloadManager.getUserPayload().registerNewUser();

    registeredUser = payloadManager.getUserPayload().loadRegisteredUser();

    token = await payloadManager
      .getUserPayload()
      .createToken(registeredUser.email, registeredUser.password);

    expect(token).toBeTruthy();
  });

  test(
    "As a user, I should be able to create a note",
    { tag: "@regression" },
    async ({ payloadManager }) => {
      const notePayload = payloadManager
        .getNotesPayload()
        .buildCreateNotePayload(
          createRandomNote().title,
          createRandomNote().description,
          "Work",
        );

      await payloadManager.getNotesPayload().createNote(token, notePayload);
    },
  );

  test("As a user, I should be able to get specific note details", async ({
    payloadManager,
  }) => {
    const noteData = payloadManager.getNotesPayload().loadNote();
    const noteId = noteData.id;

    const noteDetails = await payloadManager
      .getNotesPayload()
      .getNoteDetails(token, noteId);
    expect(noteDetails).toHaveProperty("id", noteId);
    expect(noteDetails).toHaveProperty("title", noteData.title);
    expect(noteDetails).toHaveProperty("description", noteData.description);
    expect(noteDetails).toHaveProperty("category", noteData.category);
  });

  test("As a user, I should be able to update a note", async ({
    payloadManager,
  }) => {
    const noteData = payloadManager.getNotesPayload().loadNote();
    const noteId = noteData.id;

    const updatedNotePayload = payloadManager
      .getNotesPayload()
      .buildUpdateNotePayload(
        noteId,
        createRandomNote().title,
        createRandomNote().description,
        true,
        "Personal",
      );

    const updatedNote = await payloadManager
      .getNotesPayload()
      .updateNote(token, updatedNotePayload);

    expect(updatedNote).toHaveProperty("id", noteId);
    expect(updatedNote).toHaveProperty("title", updatedNotePayload.title);
    expect(updatedNote).toHaveProperty(
      "description",
      updatedNotePayload.description,
    );
    expect(updatedNote).toHaveProperty("category", updatedNotePayload.category);
  });
});
