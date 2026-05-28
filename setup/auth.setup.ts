import { test as setup } from "../testOptions";
import path from "path";

/**
 * Description: This setup file is responsible for performing authentication before running the tests. 
 * It uses the test function from testOptions to define a setup step that logs in to the application and saves the authenticated state to a file. 
 * This allows the tests to run with an authenticated session without having to log in before each test.
 */

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



