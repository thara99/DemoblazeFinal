import { Page, Locator, expect } from "@playwright/test";

export class SignupPage {
  readonly btnSignUp: Locator;
  readonly modalSignUp: Locator;
  readonly txtUsername: Locator;
  readonly txtPassword: Locator;
  readonly btnRegister: Locator;

  constructor(private page: Page) {
    this.btnSignUp = page.locator("#signin2");
    this.modalSignUp = page.locator("#signInModal");
    this.txtUsername = page.locator("#sign-username");
    this.txtPassword = page.locator("#sign-password");
    this.btnRegister = page.locator('button[onclick="register()"]');
  }

  async goto() {
    await this.page.goto("/");
    await this.btnSignUp.click();
    await expect(this.modalSignUp).toBeVisible();
  }

  async signup(username: string, password: string) {
    await this.txtUsername.fill(username);
    await this.txtPassword.fill(password);
    await this.btnRegister.click();
  }
}
