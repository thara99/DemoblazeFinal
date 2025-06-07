import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}
  async goto() {
    // Navigate to cart page
    await this.page.click("#cartur");
    await this.page.waitForURL("**/cart.html");
    await this.page.waitForLoadState("domcontentloaded");

    // Wait for cart table to appear
    await this.page.waitForSelector("table.table", { state: "visible" });

    // Wait for either products to load or empty cart message
    await Promise.race([
      this.page.waitForSelector("table.table tbody tr", { state: "visible" }),
      this.page.waitForSelector("h1.text-center:has-text('Products')"),
    ]);
  }
  async removeProductByName(productName: string): Promise<void> {
    // Wait for the cart contents to load
    await this.page.waitForSelector("table.table", { state: "visible" });

    // Convert to lowercase for better matching
    const productNameLower = productName.toLowerCase();

    // Try exact match first
    let row = this.page.locator("tr", { hasText: productName });
    let count = await row.count();

    // Fall back to partial matching if exact match fails
    if (count === 0) {
      const allRows = this.page.locator("table.table tbody tr");
      const rowCount = await allRows.count();

      for (let i = 0; i < rowCount; i++) {
        const titleElement = allRows.nth(i).locator("td:nth-child(2)");
        const title = await titleElement.innerText();

        if (title.toLowerCase().includes(productNameLower)) {
          row = allRows.nth(i);
          count = 1;
          break;
        }
      }
    }
    if (count > 0) {
      // Find and click the delete button for this product
      const deleteButton = row.locator("td a", { hasText: "Delete" });
      await deleteButton.waitFor({ state: "visible" });
      await deleteButton.click();

      // Wait for the item to be removed from the DOM
      await this.page.waitForSelector(`tr:has-text("${productName}")`, {
        state: "detached",
      });

      // Verify the item is no longer in the cart
      await expect(row).toHaveCount(0);
    } else {
      // Item not found in the cart, no action needed
    }
  }
}
