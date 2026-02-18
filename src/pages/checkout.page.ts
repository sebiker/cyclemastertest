import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  private readonly billingFirstName: Locator;
  private readonly billingLastName: Locator;
  private readonly billingEmail: Locator;
  private readonly billingPhone: Locator;
  private readonly billingAddress: Locator;
  private readonly billingCity: Locator;
  private readonly billingPostcode: Locator;
  private readonly billingCountry: Locator;
  private readonly shippingAddress: Locator;
  private readonly shippingMethod: Locator;
  private readonly paymentMethod: Locator;
  private readonly agreeTermsCheckbox: Locator;
  private readonly placeOrderButton: Locator;
  private readonly continueButton: Locator;
  private readonly orderSummary: Locator;

  constructor(private readonly page: Page) {
    this.billingFirstName = page.locator('input[placeholder*="First"], input[name*="firstname"]').first();
    this.billingLastName = page.locator('input[placeholder*="Last"], input[name*="lastname"]').first();
    this.billingEmail = page.locator('input[type="email"]').first();
    this.billingPhone = page.locator('input[placeholder*="Phone"], input[name*="telephone"]').first();
    this.billingAddress = page.locator('input[placeholder*="Address"], input[name*="address"]').first();
    this.billingCity = page.locator('input[placeholder*="City"], input[name*="city"]').first();
    this.billingPostcode = page.locator('input[placeholder*="Postal"], input[name*="postcode"]').first();
    this.billingCountry = page.locator('select[name*="country"], [placeholder*="Country"]').first();
    this.shippingAddress = page.locator('input[value*="shipping"], label:has-text("Shipping")').first();
    this.shippingMethod = page.locator('input[name*="shipping_method"], [class*="shipping-method"]').first();
    this.paymentMethod = page.locator('input[name*="payment_method"], [class*="payment-method"]').first();
    this.agreeTermsCheckbox = page.locator('input[type="checkbox"][name*="agree"], label:has-text("agree")').first();
    this.placeOrderButton = page.locator('button:has-text("Place Order"), button:has-text("Comanda"), input[value="Comanda"]').first();
    this.continueButton = page.locator('button:has-text("Continue")').first();
    this.orderSummary = page.locator('[class*="order-summary"], [class*="summary"]').first();
  }

  async goto() {
    await this.page.goto('/?route=checkout/checkout');
  }

  async fillBillingInfo(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    postcode: string,
    country: string
  ) {
    await this.billingFirstName.fill(firstName);
    await this.billingLastName.fill(lastName);
    await this.billingEmail.fill(email);
    await this.billingPhone.fill(phone);
    await this.billingAddress.fill(address);
    await this.billingCity.fill(city);
    await this.billingPostcode.fill(postcode);
    await this.billingCountry.selectOption(country);
  }

  async selectShippingMethod(method: string) {
    const shippingOption = this.page.locator(`input[value*="${method}"], label:has-text("${method}")`).first();
    if (await shippingOption.isVisible()) {
      await shippingOption.click();
    }
  }

  async selectPaymentMethod(method: string) {
    const paymentOption = this.page.locator(`input[value*="${method}"], label:has-text("${method}")`).first();
    if (await paymentOption.isVisible()) {
      await paymentOption.click();
    }
  }

  async agreeToTerms() {
    if (await this.agreeTermsCheckbox.isVisible()) {
      await this.agreeTermsCheckbox.click();
    }
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    await this.page.waitForURL('**/success**');
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async getOrderSummary() {
    return this.orderSummary.textContent();
  }

  async isCheckoutFormVisible() {
    return this.billingFirstName.isVisible();
  }
}
