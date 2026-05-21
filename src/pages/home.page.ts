import { Page, Locator } from '@playwright/test';

export class HomePage {
  private readonly recommendedSection: Locator;
  private readonly recentlyAddedSection: Locator;
  private readonly componenteLink: Locator;
  private readonly transmisieLink: Locator;
  private readonly franeLink: Locator;
  private readonly rotiLink: Locator;
  private readonly accesoriiLink: Locator;
  private readonly contactLink: Locator;
  private readonly searchInput: Locator;

  constructor(private readonly page: Page) {
    this.recommendedSection = page.locator('text=Recomandări').first();
    this.recentlyAddedSection = page.locator('text=Recent adăugate').first();
    this.componenteLink = page.locator('main a:has-text("Componente")').first();
    this.transmisieLink = page.locator('main a:has-text("Transmisie")').first();
    this.franeLink = page.locator('main a:has-text("Frane")').first();
    this.rotiLink = page.locator('main a:has-text("Roti")').first();
    this.accesoriiLink = page.locator('main a:has-text("Accesorii")').first();
    this.contactLink = page.locator('main a:has-text("Contact")').first();
    this.searchInput = page.locator('input[name*="search"], input[placeholder*="search"], input[placeholder*="cauta"]').first();
  }

  async goto() {
    await this.page.goto('/');
  }

  async goToComponente() {
    await this.componenteLink.click();
  }

  async goToTransmisie() {
    await this.transmisieLink.click();
  }

  async goToFrane() {
    await this.franeLink.click();
  }

  async goToRoti() {
    await this.rotiLink.click();
  }

  async goToAccesorii() {
    await this.accesoriiLink.click();
  }

  async goToContact() {
    await this.contactLink.click();
  }

  async isRecommendedSectionVisible() {
    return this.recommendedSection.isVisible();
  }

  async isRecentlyAddedSectionVisible() {
    return this.recentlyAddedSection.isVisible();
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    const searchBtn = this.page.locator('button[type="submit"], button:has-text("Search"), button:has-text("Cauta")').first();
    await searchBtn.click();
  }
}
