import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  private readonly productTitle: Locator;
  private readonly productPrice: Locator;
  private readonly productDescription: Locator;
  private readonly addToCartButton: Locator;
  private readonly wishlistButton: Locator;
  private readonly compareButton: Locator;
  private readonly productRating: Locator;
  private readonly productImage: Locator;
  private readonly quantityInput: Locator;

  constructor(private readonly page: Page) {
    this.productTitle = page.locator('h1, h2').first();
    this.productPrice = page.locator('text=/Lei$/').first();
    this.productDescription = page.locator('[class*="description"], [class*="content"]').first();
    this.addToCartButton = page.locator('button:has-text("Adauga"), button:has-text("Cart"), input[type="submit"]').first();
    this.wishlistButton = page.locator('button[href*="wishlist"], a[href*="wishlist"], button:has-text("Wishlist")').first();
    this.compareButton = page.locator('button[href*="compare"], a[href*="compare"], button:has-text("Compare")').first();
    this.productRating = page.locator('[class*="rating"], [class*="stars"]').first();
    this.productImage = page.locator('img[class*="product"], img[alt*="product"]').first();
    this.quantityInput = page.locator('input[name*="quantity"]').first();
  }

  async goto(productId: string) {
    await this.page.goto(`/?route=product/product&product_id=${productId}`);
  }

  async getProductTitle() {
    return this.productTitle.textContent();
  }

  async getProductPrice() {
    return this.productPrice.textContent();
  }

  async getProductDescription() {
    return this.productDescription.textContent();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async addToWishlist() {
    if (await this.wishlistButton.isVisible()) {
      await this.wishlistButton.click();
    }
  }

  async compare() {
    if (await this.compareButton.isVisible()) {
      await this.compareButton.click();
    }
  }

  async isProductTitleVisible() {
    return this.productTitle.isVisible();
  }

  async isProductPriceVisible() {
    return this.productPrice.isVisible();
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async isProductRatingVisible() {
    return this.productRating.isVisible();
  }

  async isProductImageVisible() {
    return this.productImage.isVisible();
  }
}
