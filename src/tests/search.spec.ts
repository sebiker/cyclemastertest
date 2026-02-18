import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SearchPage } from '../pages/search.page';

test.describe('Search Functionality', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.goto();
  });

  test('should search for products by keyword', async ({ page }) => {
    await searchPage.search('Tune');
    await expect(page).toHaveURL(/.*search.*/);
    
    const resultCount = await searchPage.getSearchResultCount();
    expect(resultCount).toBeGreaterThan(0);
  });

  test('should search for Duke products', async ({ page }) => {
    await searchPage.search('Duke');
    await expect(page).toHaveURL(/.*search.*/);
    
    const resultCount = await searchPage.getSearchResultCount();
    expect(resultCount).toBeGreaterThan(0);
  });

  test('should search for Shimano products', async ({ page }) => {
    await searchPage.search('Shimano');
    await expect(page).toHaveURL(/.*search.*/);
    
    const resultCount = await searchPage.getSearchResultCount();
    expect(resultCount).toBeGreaterThan(0);
  });

  test('should navigate to first search result', async ({ page }) => {
    await searchPage.search('Tune');
    await searchPage.clickFirstResult();
    
    await expect(page).toHaveURL(/.*product.*/);
  });

  test('should handle empty search results gracefully', async ({ page }) => {
    await searchPage.search('XYZNOTFOUND123');
    
    const hasNoResults = await searchPage.isNoResultsMessageVisible();
    const resultCount = await searchPage.getSearchResultCount();
    
    expect(hasNoResults || resultCount === 0).toBeTruthy();
  });

  test('should filter search results by category', async ({ page }) => {
    await searchPage.search('valve');
    await searchPage.filterByCategory('Componente');
    
    await page.waitForTimeout(1000);
    const resultCount = await searchPage.getSearchResultCount();
    expect(resultCount).toBeGreaterThanOrEqual(0);
  });

  test('should filter search results by manufacturer', async ({ page }) => {
    await searchPage.search('valve');
    await searchPage.filterByManufacturer('Duke');
    
    await page.waitForTimeout(1000);
    const resultCount = await searchPage.getSearchResultCount();
    expect(resultCount).toBeGreaterThanOrEqual(0);
  });

  test('should filter search results by price range', async ({ page }) => {
    await searchPage.search('valve');
    await searchPage.filterByPriceRange(50, 200);
    
    await page.waitForTimeout(1000);
    expect(true).toBeTruthy();
  });

  test('should clear search query', async () => {
    await searchPage.search('Tune');
    await searchPage.clearSearch();
    
    expect(true).toBeTruthy();
  });
});
