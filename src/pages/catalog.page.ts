import { Page, Locator } from '@playwright/test';

export class CatalogPage {
  private readonly products: Locator;
  private readonly sortDropdown: Locator;
  private readonly filterContainer: Locator;
  private readonly componenteLink: Locator;
  private readonly transmisieLink: Locator;
  private readonly franeLink: Locator;
  private readonly rotiLink: Locator;
  private readonly accesoriiLink: Locator;
  private readonly atelierLink: Locator;
  private readonly echipamentLink: Locator;
  private readonly powerMeterLink: Locator;
  private readonly homeTrainersLink: Locator;
  private readonly gpsLink: Locator;

  constructor(private readonly page: Page) {
    this.products = page.locator('a[href*="product_id"]');
    this.sortDropdown = page.locator('select, [role="listbox"]').first();
    this.filterContainer = page.locator('[class*="filter"]').first();
    this.componenteLink = page.locator('a[href*="path=60"]');
    this.transmisieLink = page.locator('a[href*="path=79"]');
    this.franeLink = page.locator('a[href*="path=66"]');
    this.rotiLink = page.locator('a[href*="path=77"]');
    this.accesoriiLink = page.locator('a[href*="path=93"]');
    this.atelierLink = page.locator('a[href*="path=107"]');
    this.echipamentLink = page.locator('a[href*="path=111"]');
    this.powerMeterLink = page.locator('a[href*="path=137"]');
    this.homeTrainersLink = page.locator('a[href*="path=174"]');
    this.gpsLink = page.locator('a[href*="path=148"]');
  }

  async goToComponente() {
    await this.componenteLink.click();
    await this.page.waitForURL('**/category**');
  }

  async goToTransmisie() {
    await this.transmisieLink.click();
    await this.page.waitForURL('**/category**');
  }

  async goToFrane() {
    await this.franeLink.click();
    await this.page.waitForURL('**/category**');
  }

  async goToRoti() {
    await this.rotiLink.click();
    await this.page.waitForURL('**/category**');
  }

  async goToAccesorii() {
    await this.accesoriiLink.click();
    await this.page.waitForURL('**/category**');
  }

  async goToAtelier() {
    await this.atelierLink.click();
    await this.page.waitForURL('**/category**');
  }

  async goToEchipament() {
    await this.echipamentLink.click();
    await this.page.waitForURL('**/category**');
  }

  async goToPowerMeter() {
    await this.powerMeterLink.click();
    await this.page.waitForURL('**/category**');
  }

  async goToHomeTrainers() {
    await this.homeTrainersLink.click();
    await this.page.waitForURL('**/category**');
  }

  async goToGPS() {
    await this.gpsLink.click();
    await this.page.waitForURL('**/category**');
  }

  async getFirstProduct() {
    return this.products.first();
  }

  async clickFirstProduct() {
    await this.products.first().click();
  }

  async getProductCount() {
    return this.products.count();
  }

  async isSortDropdownVisible() {
    return this.sortDropdown.isVisible();
  }

  async sortBy(option: string) {
    await this.sortDropdown.click();
    await this.page.locator(`text=${option}`).click();
  }
}
