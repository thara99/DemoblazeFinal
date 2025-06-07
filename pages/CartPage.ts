import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}
  async goto() {
    // Click on cart link
    await this.page.click("#cartur");

    // Wait for the cart URL to be loaded
    await this.page.waitForURL("**/cart.html");

    // Wait for the DOM to be ready
    await this.page.waitForLoadState("domcontentloaded");

    // Now wait for critical UI elements to be present
    await this.page.waitForSelector("table.table", { state: "visible" });

    // Check if there are items in cart or if the cart is empty
    await Promise.race([
      this.page.waitForSelector("table.table tbody tr", { state: "visible" }),
      this.page.waitForSelector("h1.text-center:has-text('Products')"), // Empty cart indicator
    ]);
  }
  async removeProductByName(productName: string): Promise<void> {
    // First wait for the cart table to be visible
    await this.page.waitForSelector("table.table", { state: "visible" });

    // Convert the product name to lowercase for case-insensitive comparison
    const productNameLower = productName.toLowerCase();

    // First try with case-sensitive approach
    let row = this.page.locator("tr", { hasText: productName });
    let count = await row.count();

    // If not found, try case-insensitive approach by checking each product title
    if (count === 0) {
      // Get all product rows
      const allRows = this.page.locator("table.table tbody tr");
      const rowCount = await allRows.count();

      // Check each row for the product name
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
