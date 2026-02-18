import { Page, Locator } from '@playwright/test';

export class InformationPage {
  private readonly aboutLink: Locator;
  private readonly privacyLink: Locator;
  private readonly termsLink: Locator;
  private readonly shippingPaymentLink: Locator;
  private readonly anpcLink: Locator;
  private readonly sitemapLink: Locator;
  private readonly contactLink: Locator;
  private readonly contactForm: Locator;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly messageInput: Locator;
  private readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.aboutLink = page.locator('a:has-text("Despre Cycle Master"), a[href*="information"]').first();
    this.privacyLink = page.locator('a:has-text("Politica de confidentialitate"), a[href*="privacy"]').first();
    this.termsLink = page.locator('a:has-text("Termeni si conditii"), a[href*="terms"]').first();
    this.shippingPaymentLink = page.locator('a:has-text("Livrare si plata"), a[href*="shipping"]').first();
    this.anpcLink = page.locator('a:has-text("ANPC"), a[href*="anpc"]').first();
    this.sitemapLink = page.locator('a:has-text("Harta sitului"), a[href*="sitemap"]').first();
    this.contactLink = page.locator('a:has-text("Contact"), a[href*="contact"]').first();
    this.contactForm = page.locator('form').first();
    this.nameInput = page.locator('input[placeholder*="name"], input[name*="name"]').first();
    this.emailInput = page.locator('input[type="email"], input[name*="email"]').first();
    this.messageInput = page.locator('textarea, textarea[name*="message"]').first();
    this.submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
  }

  async goToAbout() {
    if (await this.aboutLink.isVisible()) {
      await this.aboutLink.click();
    }
  }

  async goToPrivacy() {
    if (await this.privacyLink.isVisible()) {
      await this.privacyLink.click();
    }
  }

  async goToTerms() {
    if (await this.termsLink.isVisible()) {
      await this.termsLink.click();
    }
  }

  async goToShippingPayment() {
    if (await this.shippingPaymentLink.isVisible()) {
      await this.shippingPaymentLink.click();
    }
  }

  async goToANPC() {
    if (await this.anpcLink.isVisible()) {
      await this.anpcLink.click();
    }
  }

  async goToSitemap() {
    if (await this.sitemapLink.isVisible()) {
      await this.sitemapLink.click();
      await this.page.waitForURL('**/sitemap**');
    }
  }

  async goToContact() {
    if (await this.contactLink.isVisible()) {
      await this.contactLink.click();
    }
  }

  async submitContactForm(name: string, email: string, message: string) {
    if (await this.contactForm.isVisible()) {
      await this.nameInput.fill(name);
      await this.emailInput.fill(email);
      await this.messageInput.fill(message);
      await this.submitButton.click();
    }
  }

  async isContactFormVisible() {
    return this.contactForm.isVisible();
  }
}
