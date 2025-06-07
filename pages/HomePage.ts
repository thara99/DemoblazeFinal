import { Page, Locator, expect } from "@playwright/test";

export async function getSonyVaioProducts(
  page: Page
): Promise<{ locator: Locator; title: string }[]> {
  const matchingProducts: { locator: Locator; title: string }[] = [];

  // Navigate to the laptops category
  await page.locator('#itemc:has-text("Laptops")').click();
  await page.waitForTimeout(1000); // Allow time for content to load

  let hasNext = true;
  let pageNum = 1;

  while (hasNext) {
    // Find all product title links on the current page
    const products = page.locator(".card-title a");
    const count = await products.count();

    for (let i = 0; i < count; i++) {
      const product = products.nth(i);
      const title = await product.innerText();

      if (title.toLowerCase().includes("sony vaio")) {
        // Store both the locator and the title
        matchingProducts.push({
          locator: product,
          title: title,
        });
      }
    }
    // Pagination: Check for next button and navigate if available
    const nextButton = page.locator('button:has-text("Next")');
    hasNext = await nextButton.isVisible();

    if (hasNext) {
      await nextButton.click();
      await page.waitForTimeout(1000); // Wait for page content to update
      pageNum++;
    }
  }
  // Return array of matching products with both locator and title
  return matchingProducts;
}
