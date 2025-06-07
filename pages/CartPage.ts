import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.click("#cartur");
    await this.page.waitForLoadState("domcontentloaded");
  }
  async removeProductByName(productName: string): Promise<void> {
    const row = this.page.locator("tr", { hasText: productName });
    const deleteButton = row.locator("td a", { hasText: "Delete" });

    if (await deleteButton.isVisible()) {
      console.log(`🗑️ Removing product "${productName}" from cart...`);
      await deleteButton.click();
      await this.page.waitForTimeout(1000); // wait for DOM update

      // Simple verification that the item is no longer in the cart
      await expect(
        this.page.locator("tr", { hasText: productName })
      ).toHaveCount(0);
    } else {
      console.warn(`⚠️ Product "${productName}" not found in cart.`);
    }
  }
}
