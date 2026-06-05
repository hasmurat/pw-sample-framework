import { expect, APIRequestContext } from "@playwright/test";
import BasePayload from "./base.payload";
import { createRandomUser } from "../utils/faker";
import fs from "fs";
import path from "path";

export default class UserPayload extends BasePayload {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async registerNewUser() {
    const user = createRandomUser();

    const response = await this.getRequest().post(
      `${process.env.API_URL}/users/register`,
      {
        data: user,
      },
    );

    const responseBody = await response.json();
    expect(response.status()).toBe(201);

    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toEqual("User account created successfully");
    expect(responseBody.data).toHaveProperty("id");
    expect(responseBody.data).toHaveProperty("name", user.name);
    expect(responseBody.data).toHaveProperty("email", user.email);

    // Save the registered user data to a JSON file for later use
    const userDir = path.join(__dirname, "../playwright/.user");

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    const registeredUsersFilePath = path.join(userDir, "registeredUsers.json");

    fs.writeFileSync(
      registeredUsersFilePath,
      JSON.stringify(user, null, 2),
      "utf-8",
    );
  }

    async createToken(email: string, password: string) {
    const response = await this.getRequest().post(
      `${process.env.API_URL}/users/login`,
      {
        data: { email, password },
      },
    );

    const responseBody = await response.json();
    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toEqual("Login successful");

    expect(responseBody.data).toHaveProperty("token");
    return responseBody.data.token;
  }
}
