import { test } from "../testOptions";

test("As a user, I should be able to login successfully", async ({ pageManager }) => {
  await pageManager.getLoginPage().navigateTo('login');
  await pageManager.getLoginPage().login(process.env.EMAIL_ADDRESS!, process.env.PASSWORD!);
});
