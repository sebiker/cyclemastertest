import { Page, Locator } from '@playwright/test';

export class AccountPage {
  private readonly loginLink: Locator;
  private readonly createAccountLink: Locator;
  private readonly accountMenu: Locator;
  private readonly orderHistoryLink: Locator;
  private readonly wishlistLink: Locator;
  private readonly newsletterLink: Locator;
  private readonly accountSettings: Locator;
  private readonly logoutLink: Locator;
  private readonly myAccountLink: Locator;
  private readonly returnsLink: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.loginLink = page.locator('a:has-text("Login"), a:has-text("Conectare"), a[href*="login"]').first();
    this.createAccountLink = page.locator('a:has-text("Create"), a:has-text("Register"), a[href*="register"]').first();
    this.accountMenu = page.locator('a:has-text("Contul meu"), a[href*="account"]').first();
    this.orderHistoryLink = page.locator('a:has-text("Istoric comenzi"), a[href*="order"]').first();
    this.wishlistLink = page.locator('a:has-text("Wish List"), a[href*="wishlist"]').first();
    this.newsletterLink = page.locator('a:has-text("Newsletter"), a[href*="newsletter"]').first();
    this.accountSettings = page.locator('[class*="account"]').first();
    this.logoutLink = page.locator('a:has-text("Logout"), a:has-text("Iesire")');
    this.myAccountLink = page.locator('a:has-text("My Account")').first();
    this.returnsLink = page.locator('a:has-text("Returnari"), a[href*="return"]').first();
    this.emailInput = page.locator('input[type="email"], input[name*="email"]').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.loginButton = page.locator('button:has-text("Login"), button:has-text("Conectare"), input[type="submit"]').first();
  }

  async goToLogin() {
    await this.loginLink.click();
    await this.page.waitForURL('**/login**');
  }

  async goToRegister() {
    await this.createAccountLink.click();
    await this.page.waitForURL('**/register**');
  }

  async goToMyAccount() {
    await this.accountMenu.click();
    await this.page.waitForURL('**/account**');
  }

  async goToOrderHistory() {
    if (await this.orderHistoryLink.isVisible()) {
      await this.orderHistoryLink.click();
      await this.page.waitForURL('**/order**');
    }
  }

  async goToWishlist() {
    await this.wishlistLink.click();
    await this.page.waitForURL('**/wishlist**');
  }

  async goToNewsletter() {
    if (await this.newsletterLink.isVisible()) {
      await this.newsletterLink.click();
      await this.page.waitForURL('**/newsletter**');
    }
  }

  async goToReturns() {
    if (await this.returnsLink.isVisible()) {
      await this.returnsLink.click();
      await this.page.waitForURL('**/return**');
    }
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async isLoggedIn() {
    return this.logoutLink.isVisible().catch(() => false);
  }

  async isLoginFormVisible() {
    return this.emailInput.isVisible();
  }
}
