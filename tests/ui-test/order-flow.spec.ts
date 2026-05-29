import { expect } from "@playwright/test";
import { test } from "../../testOptions";
import { getTestData } from "../../utils/dataLoader";

const checkOutData = getTestData("checkOutData");

test(
  "As a user, I should be able to create an order, complete the checkout process, and track the order",
  { tag: "@regression" },
  async ({ pageManager }) => {

    // Navigate to the shop page and add a product to the cart
    await pageManager.getProductsPage().navigateToPage("Shop");

    // Add Brazilian Santos to the cart and get its price
    await pageManager.getProductsPage().addProductToCart("Brazilian Santos");
    const productPrice = await pageManager
      .getProductsPage()
      .getProductPrice("Brazilian Santos");

    // Navigate to Cart page
    await pageManager.getCartPage().clickCartButton();

    // Assert the selected product is in the Cart and its price is correct
    await pageManager.getCartPage().assertProductInCart("Brazilian Santos");
    await expect(pageManager.getCartPage().getSubTotal()).resolves.toBe(
      productPrice,
    );

    // Navigate to Checkout page
    await pageManager.getCartPage().clickProceedToCheckout();

    await pageManager.getCheckoutPage().verifyEmailAddress();

    // Fill in the checkout form and submit the order
    await pageManager
      .getCheckoutPage()
      .fillShippingAddress(
        checkOutData.shipping_address.address,
        checkOutData.shipping_address.city,
        checkOutData.shipping_address.zipCode,
        checkOutData.shipping_address.country,
      );

    await pageManager
      .getCheckoutPage()
      .fillPaymentDetails(
        checkOutData.payment_information.nameOnCard,
        checkOutData.payment_information.cardNumber,
        checkOutData.payment_information.expiry,
        checkOutData.payment_information.cvc,
      );

    // Click Place Order button and assert confirmation
    await pageManager.getCheckoutPage().clickPlaceOrder();

    // Get Order ID
    const orderID = await pageManager.getCheckoutPage().getOrderID();

    // Navigate to Contact page
    await pageManager.getCheckoutPage().navigateToPage("Contact");

    // Fill in the order tracking form and submit
    await pageManager
      .getContactPage()
      .trackOrder(orderID, process.env.EMAIL_ADDRESS || "");
  },
);
