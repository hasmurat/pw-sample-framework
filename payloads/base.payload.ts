import { APIRequestContext } from "@playwright/test";

export default class BasePayload {
  protected readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

   getRequest(): APIRequestContext {
      return this.request;
    }
}
