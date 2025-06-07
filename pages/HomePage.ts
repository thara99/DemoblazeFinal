import { Page, Locator, expect } from "@playwright/test";

export async function getSonyVaioProducts(
  page: Page
): Promise<{ locator: Locator; title: string }[]> {
  const matchingProducts: { locator: Locator; title: string }[] = [];

  // Go to the home page and click the 'Laptops' category
  await page.locator('#itemc:has-text("Laptops")').click();
  await page.waitForTimeout(1000); // wait for content to load

  let hasNext = true;
  let pageNum = 1;

  while (hasNext) {
    console.log(`Scanning page ${pageNum} for Sony Vaio products...`);
    // Find all product title links on the current page
    const products = page.locator(".card-title a");
    const count = await products.count();

    console.log(`Found ${count} total products on this page`);

    for (let i = 0; i < count; i++) {
      const product = products.nth(i);
      const title = await product.innerText();

      console.log(`Product ${i + 1}: "${title}"`);

      if (title.toLowerCase().includes("sony vaio")) {
        console.log(`MATCH: "${title}" contains "sony vaio"`);
        // Store both the locator and the title
        matchingProducts.push({
          locator: product,
          title: title,
        });
      }
    } // Check for next button and go to next page if visible
    const nextButton = page.locator('button:has-text("Next")');
    hasNext = await nextButton.isVisible();

    if (hasNext) {
      await nextButton.click();
      await page.waitForTimeout(1000);
      pageNum++;
    }
  }

  console.log(
    `Found a total of ${matchingProducts.length} Sony Vaio products across all pages`
  );
  if (matchingProducts.length > 0) {
    console.log("Products found:");
    matchingProducts.forEach((product, i) => {
      console.log(`${i + 1}. ${product.title}`);
    });
  }

  // Return array of matching products with both locator and title
  return matchingProducts;
}
