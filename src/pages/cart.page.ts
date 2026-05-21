import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly cartItems: Locator;
  private readonly cartTotal: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly removeItemButton: Locator;
  private readonly quantityInput: Locator;
  private readonly updateButton: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly subtotal: Locator;
  private readonly shipping: Locator;
  private readonly couponInput: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('[class*="cart"] tr, [class*="product-row"]');
    this.cartTotal = page.locator('text=/Total|total/i').last();
    this.checkoutButton = page.locator('a:has-text("Checkout"), a:has-text("Comandă"), button:has-text("Checkout")').first();
    this.continueShoppingButton = page.locator('a:has-text("Continue"), button:has-text("Continue")');
    this.removeItemButton = page.locator('button:has-text("Remove"), button:has-text("Sterge"), a:has-text("x")').first();
    this.quantityInput = page.locator('input[name*="quantity"]').first();
    this.updateButton = page.locator('button:has-text("Update")').first();
    this.emptyCartMessage = page.locator('text=/Your cart is empty|cos gol|cos poate sa fie gol/i');
    this.subtotal = page.locator('text=/Subtotal|Subtotal/i');
    this.shipping = page.locator('main').locator('text=/Shipping|Livrare/i').last();
    this.couponInput = page.locator('input[placeholder*="coupon"], input[placeholder*="Coupon"]');
  }

  async goto() {
    await this.page.goto('/?route=checkout/cart');
  }

  async getCartItemCount() {
    return this.cartItems.count();
  }

  async getCartTotal() {
    return this.cartTotal.textContent();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout**');
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeFirstItem() {
    await this.removeItemButton.click();
  }

  async updateQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
    if (await this.updateButton.isVisible()) {
      await this.updateButton.click();
    }
  }

  async isCartEmpty() {
    return this.emptyCartMessage.isVisible().catch(() => false);
  }

  async getSubtotal() {
    return this.subtotal.textContent();
  }

  async getShippingCost() {
    return this.shipping.textContent();
  }

  async applyCoupon(couponCode: string) {
    if (await this.couponInput.isVisible()) {
      await this.couponInput.fill(couponCode);
      const applyButton = this.page.locator('button:has-text("Apply")').first();
      if (await applyButton.isVisible()) {
        await applyButton.click();
      }
    }
  }
}
