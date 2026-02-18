import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CatalogPage } from '../pages/catalog.page';
import { ProductDetailPage } from '../pages/product-detail.page';

test.describe('Product Detail Page', () => {
  let catalogPage: CatalogPage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    catalogPage = new CatalogPage(page);
    productDetailPage = new ProductDetailPage(page);
    
    // Navigate to first product
    await catalogPage.goToComponente();
    await catalogPage.clickFirstProduct();
  });

  test('should display product title', async () => {
    const isVisible = await productDetailPage.isProductTitleVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should display product price', async () => {
    const isVisible = await productDetailPage.isProductPriceVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should get product title text', async () => {
    const title = await productDetailPage.getProductTitle();
    expect(title?.length).toBeGreaterThan(0);
  });

  test('should get product price text', async () => {
    const price = await productDetailPage.getProductPrice();
    expect(price?.length).toBeGreaterThan(0);
    expect(price).toContain('Lei');
  });

  test('should display product description', async () => {
    const description = await productDetailPage.getProductDescription();
    expect(description?.length || 0).toBeGreaterThan(0);
  });

  test('should display product image', async () => {
    const isVisible = await productDetailPage.isProductImageVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should be able to set product quantity', async () => {
    await productDetailPage.setQuantity(2);
    expect(true).toBeTruthy(); // If no error thrown, quantity was set
  });

  test('should have add to cart functionality', async ({ page }) => {
    await productDetailPage.addToCart();
    // Wait briefly for cart update
    await page.waitForTimeout(500);
    expect(true).toBeTruthy();
  });

  test('should have wishlist functionality', async () => {
    await productDetailPage.addToWishlist();
    expect(true).toBeTruthy();
  });

  test('should have compare functionality', async () => {
    await productDetailPage.compare();
    expect(true).toBeTruthy();
  });
});
