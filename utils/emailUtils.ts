import { MailSlurp } from "mailslurp-client";

export async function getLatestEmail() {
  const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY! });

  const email = await mailslurp.waitForLatestEmail(
    process.env.MAILSLURP_INBOX_ID!,
    30000,
  );
  return email;
}
