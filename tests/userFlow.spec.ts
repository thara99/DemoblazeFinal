import { test, expect } from "@playwright/test";
import { generateRandomUser } from "../utils/userGenerator";
import { SignupPage } from "../pages/SignupPage";
import { LoginPage } from "../pages/LoginPage";
import { getSonyVaioProducts } from "../pages/HomePage";
import { addToCartProductsOneByOne } from "../pages/AddToCart";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test("Complete E2E flow for Demoblaze", async ({ page }) => {
  // Initialize page objects
  const signupPage = new SignupPage(page);
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Generate test user
  const { username, password } = generateRandomUser();

  await test.step("Sign up new user", async () => {
    await signupPage.goto();
    await signupPage.signup(username, password);
    // Wait for signup alert to be handled
    await page.waitForTimeout(1000);
  });

  await test.step("Login with new user", async () => {
    await loginPage.goto();
    await loginPage.login(username, password);
    await expect(page.locator("#logout2")).toBeVisible();
  });
  await test.step("Search for Sony Laptops", async () => {
    const products = await getSonyVaioProducts(page);
    console.log(`Found ${products.length} Sony Vaio product(s).`);
    for (const product of products) {
      console.log(product.title); // Use the stored title directly
    }

    expect(products.length).toBeGreaterThan(0);
    // Verify the correct products were found
    if (products.length > 0) {
      for (const product of products) {
        expect(product.title.toLowerCase()).toContain("sony vaio");
      }
    }
  });
  await test.step("Add to cart", async () => {
    const products = await getSonyVaioProducts(page);
    expect(products.length).toBeGreaterThan(0);

    await addToCartProductsOneByOne(page, products);
  });
  await test.step("Remove an item from cart", async () => {
    await cartPage.goto();
    await cartPage.removeProductByName("Sony vaio i7");
  });
  await test.step("Checkout items", async () => {
    await checkoutPage.completeCheckout();
  });
});
