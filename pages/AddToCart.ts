import { getSonyVaioProducts } from "./HomePage";
import { Page, Locator } from "@playwright/test";

export async function addToCartProductsOneByOne(
  page: Page,
  products: { locator: Locator; title: string }[]
): Promise<void> {
  // Track successfully added products
  const successfulProducts: string[] = [];

  // Store the product names we need to find
  const targetProductNames = products.map((p) => p.title);
  console.log(`Target products to add: ${targetProductNames.join(", ")}`);
  // Process each product by name instead of relying on the initial locators
  for (const targetProductName of targetProductNames) {
    console.log(`\n🔍 Looking for product: ${targetProductName}`);

    // Navigate to the laptops category using the existing method in your site
    await page.locator('#itemc:has-text("Laptops")').click();
    await page.waitForTimeout(1000); // Wait for products to load

    // Find the product by name
    const productCard = page
      .locator(`.card-title:has-text("${targetProductName}")`)
      .first();

    // Make sure product exists on the page
    if ((await productCard.count()) === 0) {
      console.warn(
        `Could not find product "${targetProductName}" on the current page`
      );
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
    console.log(`Opened: ${productName}`);

    // Add to cart
    // Set up a promise that will resolve when the dialog appears
    const dialogPromise = page.waitForEvent("dialog");

    // Click the add to cart button
    await page.click('a.btn.btn-success.btn-lg:text("Add to cart")');

    // Wait for the dialog to appear
    const dialog = await dialogPromise;
    await dialog.accept(); // Record that this product was successfully added
    successfulProducts.push(productName);
    console.log(`Added "${productName}" to cart and accepted dialog`);
    await page.waitForTimeout(500); // Short pause after dialog

    // Go back to the home page by clicking the logo (restore your original navigation)
    await page.click("#nava");
    await page.waitForTimeout(1000); // Ensure content is reloaded
  }

  console.log(
    `\n Successfully added ${successfulProducts.length}/${
      targetProductNames.length
    } Sony Vaio products to cart: ${successfulProducts.join(", ")}`
  );
}
