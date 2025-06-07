import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly btnLogin: Locator;
  readonly modalLogin: Locator;
  readonly txtUsername: Locator;
  readonly txtPassword: Locator;
  readonly btnSignIn: Locator;
  readonly btnLogout: Locator;

  constructor(private page: Page) {
    this.btnLogin = page.locator("#login2");
    this.modalLogin = page.locator("#logInModal");
    this.txtUsername = page.locator("#loginusername");
    this.txtPassword = page.locator("#loginpassword");
    this.btnSignIn = page.locator('button[onclick="logIn()"]');
    this.btnLogout = page.locator("#logout2");
  }

  async goto() {
    await this.page.goto("/");
    await this.btnLogin.click();
    await expect(this.modalLogin).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.txtUsername.fill(username);
    await this.txtPassword.fill(password);
    await this.btnSignIn.click();
    await expect(this.btnLogin).toBeVisible();
  }
}
