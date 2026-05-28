import { test } from "../testOptions";

test("order flow", async ({ pageManager }) => {
  await pageManager.getProductsPage().navigateToPage('Shop');
});