import { Page, Locator, expect } from "@playwright/test";
import { generateTestData } from "../utils/testData";

export class CheckoutPage {
  readonly btnPlaceOrder: Locator;
  readonly txtName: Locator;
  readonly txtCountry: Locator;
  readonly txtCity: Locator;
  readonly txtCard: Locator;
  readonly txtMonth: Locator;
  readonly txtYear: Locator;
  readonly btnPurchase: Locator;
  readonly btnOk: Locator;
  // Test data for form filling
  private testData: ReturnType<typeof generateTestData>;

  constructor(private page: Page) {
    this.txtName = page.locator("#name");
    this.txtCountry = page.locator("#country");
    this.txtCity = page.locator("#city");
    this.txtCard = page.locator("#card");
    this.txtMonth = page.locator("#month");
    this.txtYear = page.locator("#year");
    this.btnPurchase = page.locator("button.btn.btn-primary", {
      hasText: "Purchase",
    });
    this.btnOk = page.locator("button.confirm.btn.btn-lg.btn-primary", {
      hasText: "OK",
    });
    this.btnPlaceOrder = page.locator("button.btn.btn-success", {
      hasText: "Place Order",
    });

    // Initialize test data with fresh values
    this.testData = generateTestData();
  }

  async navigateToCheckoutForm() {
    await expect(this.btnPlaceOrder).toBeVisible();
    await this.btnPlaceOrder.click();
    await expect(
      this.page.locator("h5.modal-title#orderModalLabel", {
        hasText: "Place order",
      })
    ).toBeVisible();
  }
  async fillCheckoutForm() {
    // Fill in all required checkout form fields
    await this.txtName.fill(this.testData.randomName);
    await this.txtCountry.fill(this.testData.randomCountry);
    await this.txtCity.fill(this.testData.randomCity);
    await this.txtCard.fill(this.testData.randomCreditCard);
    await this.txtMonth.fill(this.testData.randomMonth);
    await this.txtYear.fill(this.testData.randomYear);
  }
  async clickPurchase() {
    await this.btnPurchase.click();
    // Wait for the purchase confirmation dialog to appear
    await this.page.waitForSelector(".sweet-alert", { state: "visible" });
  }

  async completeCheckout() {
    await this.navigateToCheckoutForm();
    await this.fillCheckoutForm();
    await this.clickPurchase();
    await expect(this.btnOk).toBeVisible();
    await this.btnOk.click();
  }
}
