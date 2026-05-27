import { test } from "../testOptions";

test("As a user, I should be able to login and logout successfully", async ({ pageManager }) => {
  await pageManager.getLoginPage().navigateTo('login');
  await pageManager.getLoginPage().login(process.env.EMAIL_ADDRESS!, process.env.PASSWORD!);
  await pageManager.getLoginPage().logout();
});
