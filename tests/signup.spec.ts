import { test } from "../testOptions";
import { getTestData } from "../utils/dataLoader";
import * as emailUtils from "../utils/emailUtils";

test.use({ storageState: { cookies: [], origins: [] } });
const signupData = getTestData("signupData");
const testSignUp = process.env.SIGN_UP_FLOW

test("As a user, I should be able to sign up successfully and receive a confirmation email", async ({pageManager}) => {

  test.skip(testSignUp !== 'true', 'Skipping sign up test');
  
  await pageManager.getSignupPage().navigateTo("signup");
  await pageManager.getSignupPage().fillSignupForm(
    signupData.firstName,
    signupData.lastName,
    signupData.email,
    signupData.password
  );

  const latestEmail = await emailUtils.getLatestEmail();
  const code = /([0-9]{6})$/.exec(latestEmail?.body!)![1];
  
  await pageManager.getSignupPage().fillVerificationCode(code);

  await pageManager.getLoginPage().login(signupData.email, signupData.password);

});
