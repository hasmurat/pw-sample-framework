import { APIRequestContext } from "@playwright/test";
import RegisterPayload from "./register.payload";
import LoginPayload from "./login.payload";

export default class PayloadManager {
  private readonly request: APIRequestContext;
  private readonly registerPayload: RegisterPayload;
  private readonly loginPayload: LoginPayload;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.registerPayload = new RegisterPayload(this.request);
    this.loginPayload = new LoginPayload(this.request);
  }

    getRegisterPayload() {
      return this.registerPayload;
    }

    getLoginPayload() {
      return this.loginPayload;
    }
}
