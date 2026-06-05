import { expect, APIRequestContext } from "@playwright/test";
import BasePayload from "./base.payload";
import { createRandomUser } from "../utils/faker";
import {
  User,
  RegisterResponse,
  LoginResponse,
  RegisteredUserData,
} from "../types/user.types";
import fs from "fs";
import path from "path";

const REGISTERED_USERS_DIR = path.join(__dirname, "../playwright/.user");
const REGISTERED_USERS_FILE = path.join(
  REGISTERED_USERS_DIR,
  "registeredUsers.json",
);

export default class UserPayload extends BasePayload {
  constructor(request: APIRequestContext) {
    super(request);
  }

  private saveRegisteredUser(user: User): void {
    if (!fs.existsSync(REGISTERED_USERS_DIR)) {
      fs.mkdirSync(REGISTERED_USERS_DIR, { recursive: true });
    }

    fs.writeFileSync(
      REGISTERED_USERS_FILE,
      JSON.stringify(user, null, 2),
      "utf-8",
    );
  }

  loadRegisteredUser(): User {
    if (!fs.existsSync(REGISTERED_USERS_FILE)) {
      throw new Error(
        `Registered user file not found: ${REGISTERED_USERS_FILE}`,
      );
    }

    const raw = fs.readFileSync(REGISTERED_USERS_FILE, "utf-8");
    return JSON.parse(raw) as User;
  }

  async registerNewUser(): Promise<RegisteredUserData> {
    const user: User = createRandomUser();

    const response = await this.getRequest().post(
      `${process.env.API_URL}/users/register`,
      {
        data: user,
      },
    );

    const responseBody: RegisterResponse = await response.json();

    expect(response.status()).toBe(201);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toEqual("User account created successfully");
    expect(responseBody.data).toHaveProperty("id");
    expect(responseBody.data).toHaveProperty("name", user.name);
    expect(responseBody.data).toHaveProperty("email", user.email);

    // Save the registered user data to a JSON file for later use
    this.saveRegisteredUser(user);
    return responseBody.data;
  }

  async createToken(email: string, password: string): Promise<string> {
    const response = await this.getRequest().post(
      `${process.env.API_URL}/users/login`,
      {
        data: { email, password },
      },
    );

    const responseBody: LoginResponse = await response.json();
    expect(response.status()).toBe(200);

    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toEqual("Login successful");

    expect(responseBody.data).toHaveProperty("token");
    return responseBody.data.token;
  }
}
