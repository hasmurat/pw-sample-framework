import { test as setup } from "../testOptions";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authentication", async ({ pageManager }) => {
  await pageManager.getLoginPage().navigateTo("login");
  await pageManager
    .getLoginPage()
    .login(process.env.EMAIL_ADDRESS!, process.env.PASSWORD!);

  const productsPage = pageManager.getProductsPage();
  const browserPage = productsPage.getPage();
  await browserPage.context().storageState({ path: authFile });
  
});



