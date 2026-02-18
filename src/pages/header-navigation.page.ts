import { Page, Locator } from '@playwright/test';

export class HeaderNavigation {
  private readonly logoLink: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly cartIcon: Locator;
  private readonly cartCount: Locator;
  private readonly accountIcon: Locator;
  private readonly wishlistIcon: Locator;
  private readonly componentsMenu: Locator;
  private readonly transmissionMenu: Locator;
  private readonly brakesMenu: Locator;
  private readonly wheelsMenu: Locator;
  private readonly accessoriesMenu: Locator;
  private readonly workshopMenu: Locator;
  private readonly equipmentMenu: Locator;
  private readonly powerMeterMenu: Locator;
  private readonly homeTrainersMenu: Locator;
  private readonly gpsMenu: Locator;

  constructor(private readonly page: Page) {
    this.logoLink = page.locator('a[href="/"]').first();
    this.searchInput = page.locator('input[name*="search"], input[placeholder*="search"]').first();
    this.searchButton = page.locator('button[type="submit"]').first();
    this.cartIcon = page.locator('a:has-text("Coşul"), a[href*="cart"]').first();
    this.cartCount = page.locator('[class*="cart-count"], [class*="badge"]').first();
    this.accountIcon = page.locator('a:has-text("Contul meu"), a[href*="account"]').first();
    this.wishlistIcon = page.locator('a:has-text("Wish"), a[href*="wishlist"]').first();
    this.componentsMenu = page.locator('a:has-text("Componente")').first();
    this.transmissionMenu = page.locator('a:has-text("Transmisie")').first();
    this.brakesMenu = page.locator('a:has-text("Frane")').first();
    this.wheelsMenu = page.locator('a:has-text("Roti")').first();
    this.accessoriesMenu = page.locator('a:has-text("Accesorii")').first();
    this.workshopMenu = page.locator('a:has-text("Atelier")').first();
    this.equipmentMenu = page.locator('a:has-text("Echipament")').first();
    this.powerMeterMenu = page.locator('a:has-text("Power Meter")').first();
    this.homeTrainersMenu = page.locator('a:has-text("Home Trainers")').first();
    this.gpsMenu = page.locator('a:has-text("Navigatie"), a:has-text("GPS")').first();
  }

  async goHome() {
    await this.logoLink.click();
    await this.page.goto('/');
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForURL('**/search**');
  }

  async goToCart() {
    await this.cartIcon.click();
    await this.page.waitForURL('**/cart**');
  }

  async getCartCount() {
    return this.cartCount.textContent();
  }

  async goToAccount() {
    await this.accountIcon.click();
    await this.page.waitForURL('**/account**');
  }

  async goToWishlist() {
    await this.wishlistIcon.click();
    await this.page.waitForURL('**/wishlist**');
  }

  async goToComponents() {
    await this.componentsMenu.click();
    await this.page.waitForURL('**/category**');
  }

  async goToTransmission() {
    await this.transmissionMenu.click();
    await this.page.waitForURL('**/category**');
  }

  async goToBrakes() {
    await this.brakesMenu.click();
    await this.page.waitForURL('**/category**');
  }

  async goToWheels() {
    await this.wheelsMenu.click();
    await this.page.waitForURL('**/category**');
  }

  async goToAccessories() {
    await this.accessoriesMenu.click();
    await this.page.waitForURL('**/category**');
  }

  async goToWorkshop() {
    await this.workshopMenu.click();
    await this.page.waitForURL('**/category**');
  }

  async goToEquipment() {
    await this.equipmentMenu.click();
    await this.page.waitForURL('**/category**');
  }

  async goToPowerMeter() {
    await this.powerMeterMenu.click();
    await this.page.waitForURL('**/category**');
  }

  async goToHomeTrainers() {
    await this.homeTrainersMenu.click();
    await this.page.waitForURL('**/category**');
  }

  async goToGPS() {
    await this.gpsMenu.click();
    await this.page.waitForURL('**/category**');
  }

  async isSearchInputVisible() {
    return this.searchInput.isVisible();
  }
}
