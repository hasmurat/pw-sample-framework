import { expect, APIRequestContext } from "@playwright/test";
import BasePayload from "./base.payload";

export default class LoginPayload extends BasePayload {
  constructor(request: APIRequestContext) {
    super(request);
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
