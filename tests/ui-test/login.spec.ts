import { test } from "../../testOptions";

test.use({ storageState: { cookies: [], origins: [] } });

test(
  "As a user, I should be able to login and logout successfully",
  { tag: ["@smoke", "@regression"] },
  async ({ pageManager }) => {

    await pageManager.getLoginPage().navigateTo("login");
    await pageManager
      .getLoginPage()
      .login(process.env.EMAIL_ADDRESS!, process.env.PASSWORD!);
      
    await pageManager.getLoginPage().logout();
  },

);
