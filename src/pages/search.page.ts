import { Page, Locator } from '@playwright/test';

export class SearchPage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly searchResults: Locator;
  private readonly noResultsMessage: Locator;
  private readonly filterOptions: Locator;
  private readonly categoryFilter: Locator;
  private readonly priceFilter: Locator;
  private readonly manufacturerFilter: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.locator('input[name*="search"], input[placeholder*="search"], input[placeholder*="cauta"]').first();
    this.searchButton = page.locator('button[type="submit"], button:has-text("Search"), button:has-text("Cauta")').first();
    this.searchResults = page.locator('a[href*="product_id"]');
    this.noResultsMessage = page.locator('text=/No results|nu au fost gasiti|nu s-a gasit/i');
    this.filterOptions = page.locator('[class*="filter"]');
    this.categoryFilter = page.locator('[class*="category"] input, label:has-text("Category")');
    this.priceFilter = page.locator('[class*="price"], input[name*="price"]');
    this.manufacturerFilter = page.locator('[class*="manufacturer"], label:has-text("Manufacturer")');
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForURL('**/search**');
  }

  async getSearchResultCount() {
    return this.searchResults.count();
  }

  async getFirstSearchResult() {
    return this.searchResults.first();
  }

  async clickFirstResult() {
    await this.searchResults.first().click();
  }

  async isNoResultsMessageVisible() {
    return this.noResultsMessage.isVisible({ timeout: 2000 }).catch(() => false);
  }

  async getFilterCount() {
    return this.filterOptions.count();
  }

  async filterByCategory(category: string) {
    const categoryCheckbox = this.page.locator(`label:has-text("${category}") input`);
    if (await categoryCheckbox.isVisible()) {
      await categoryCheckbox.click();
    }
  }

  async filterByPriceRange(minPrice: number, maxPrice: number) {
    const minInput = this.page.locator('input[name*="min"], input[placeholder*="Min Price"]').first();
    const maxInput = this.page.locator('input[name*="max"], input[placeholder*="Max Price"]').first();
    
    if (await minInput.isVisible()) {
      await minInput.fill(minPrice.toString());
    }
    if (await maxInput.isVisible()) {
      await maxInput.fill(maxPrice.toString());
    }
  }

  async filterByManufacturer(manufacturer: string) {
    const manufacturerCheckbox = this.page.locator(`label:has-text("${manufacturer}") input`);
    if (await manufacturerCheckbox.isVisible()) {
      await manufacturerCheckbox.click();
    }
  }

  async clearSearch() {
    await this.searchInput.clear();
  }
}
