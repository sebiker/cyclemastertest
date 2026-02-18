import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CatalogPage } from '../pages/catalog.page';

test.describe('Product Catalog', () => {
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    catalogPage = new CatalogPage(page);
  });

  test('should navigate to and display Componente category', async ({ page }) => {
    await catalogPage.goToComponente();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should navigate to and display Transmisie category', async ({ page }) => {
    await catalogPage.goToTransmisie();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should navigate to and display Frane category', async ({ page }) => {
    await catalogPage.goToFrane();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should navigate to and display Roti category', async ({ page }) => {
    await catalogPage.goToRoti();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should navigate to and display Accesorii category', async ({ page }) => {
    await catalogPage.goToAccesorii();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should navigate to Atelier category', async ({ page }) => {
    await catalogPage.goToAtelier();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThanOrEqual(0);
  });

  test('should navigate to Echipament category', async ({ page }) => {
    await catalogPage.goToEchipament();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThanOrEqual(0);
  });

  test('should navigate to Power Meter products', async ({ page }) => {
    await catalogPage.goToPowerMeter();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThanOrEqual(0);
  });

  test('should navigate to Home Trainers', async ({ page }) => {
    await catalogPage.goToHomeTrainers();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThanOrEqual(0);
  });

  test('should navigate to GPS/Navigation products', async ({ page }) => {
    await catalogPage.goToGPS();
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThanOrEqual(0);
  });

  test('should display products in the category', async ({ page }) => {
    await catalogPage.goToComponente();
    const firstProduct = await catalogPage.getFirstProduct();
    await expect(firstProduct).toBeVisible();
  });

  test('should be able to click and navigate to product detail', async ({ page }) => {
    await catalogPage.goToComponente();
    await catalogPage.clickFirstProduct();
    await expect(page).toHaveURL(/.*product.*/);
  });
});
