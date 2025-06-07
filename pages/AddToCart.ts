import { getSonyVaioProducts } from "./HomePage";
import { Page, Locator } from "@playwright/test";

export async function addToCartProductsOneByOne(
  page: Page,
  products: { locator: Locator; title: string }[]
): Promise<void> {
  // Array to track successfully added products
  const successfulProducts: string[] = [];

  // Extract product names from the product objects
  const targetProductNames = products.map((p) => p.title);

  // Process each product individually to ensure reliability
  for (const targetProductName of targetProductNames) {
    // Navigate to the laptops category using the existing method in your site
    await page.locator('#itemc:has-text("Laptops")').click();
    await page.waitForTimeout(1000); // Wait for products to load

    // Find the product by name
    const productCard = page
      .locator(`.card-title:has-text("${targetProductName}")`)
      .first();

    // Make sure product exists on the page
    if ((await productCard.count()) === 0) {
      continue;
    }

    // Get the product link
    const productLink = productCard.locator("a");

    // Scroll into view and click the product
    await productLink.scrollIntoViewIfNeeded();
    await productLink.click();

    // Wait for product page to load
    await page.waitForSelector(".name", { timeout: 5000 });
    const productName = await page.locator(".name").innerText();

    // Add to cart
    // Set up a promise that will resolve when the dialog appears
    const dialogPromise = page.waitForEvent("dialog");

    // Click the add to cart button
    await page.click('a.btn.btn-success.btn-lg:text("Add to cart")');

    // Wait for the dialog to appear
    const dialog = await dialogPromise;
    await dialog.accept(); // Record that this product was successfully added
    successfulProducts.push(productName);

    await page.waitForTimeout(500); // Short pause after dialog

    // Go back to the home page by clicking the logo
    await page.click("#nava");
    await page.waitForTimeout(1000); // Ensure content is reloaded
  }

  // Verify products were added to cart
  if (successfulProducts.length > 0) {
    // Navigate to cart to verify items were added
    await page.click("#cartur");
    await page.waitForURL("**/cart.html");
    await page.waitForSelector("table.table", { state: "visible" });

    // Check each product
    for (const productName of successfulProducts) {
      const productInCart = page.locator(
        `table.table tbody tr td:has-text("${productName}")`
      );
      // Verify the product is visible in the cart
      await productInCart.waitFor({ state: "visible" });
    }

    // Go back to home page
    await page.click("#nava");
    await page.waitForSelector("#tbodyid", { state: "visible" });
  }
}
