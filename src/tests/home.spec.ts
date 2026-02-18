import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display recommended products section', async () => {
    const isVisible = await homePage.isRecommendedSectionVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should display recently added products section', async () => {
    const isVisible = await homePage.isRecentlyAddedSectionVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should navigate to Componente category', async ({ page }) => {
    await homePage.goToComponente();
    await expect(page).toHaveURL(/.*category.*/);
  });

  test('should navigate to Transmisie category', async ({ page }) => {
    await homePage.goToTransmisie();
    await expect(page).toHaveURL(/.*category.*/);
  });

  test('should navigate to Frane category', async ({ page }) => {
    await homePage.goToFrane();
    await expect(page).toHaveURL(/.*category.*/);
  });

  test('should navigate to Roti category', async ({ page }) => {
    await homePage.goToRoti();
    await expect(page).toHaveURL(/.*category.*/);
  });

  test('should navigate to Accesorii category', async ({ page }) => {
    await homePage.goToAccesorii();
    await expect(page).toHaveURL(/.*category.*/);
  });

  test('should navigate to Contact page', async ({ page }) => {
    await homePage.goToContact();
    await expect(page).toHaveURL(/.*contact.*/);
  });

  test('should have search functionality', async ({ page }) => {
    await homePage.search('Tune');
    await expect(page).toHaveURL(/.*search.*/);
  });
});
