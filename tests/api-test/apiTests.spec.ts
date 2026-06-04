import { test } from "../../testOptions";
import { expect } from "@playwright/test";
import fs from "fs";

test(
  "As a user, I should be able to register successfully",
  { tag: "@regression" },
  async ({ payloadManager }) => {
    await payloadManager.getRegisterPayload().registerNewUser();
  },
);

test(
  "As a user, I should be able to create a token",
  { tag: "@regression" },
  async ({ payloadManager }) => {
    
    const user = JSON.parse(
      fs.readFileSync(
        `${__dirname}/../../playwright/.user/registeredUsers.json`,
        "utf-8",
      ),
    );

    const token = await payloadManager
      .getLoginPayload()
      .createToken(user.email, user.password);

    expect(token).toBeTruthy();
  },
);
