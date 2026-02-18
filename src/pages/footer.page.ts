import { Page, Locator } from '@playwright/test';

export class FooterPage {
  private readonly aboutLink: Locator;
  private readonly privacyLink: Locator;
  private readonly termsLink: Locator;
  private readonly shippingLink: Locator;
  private readonly anpcLink: Locator;
  private readonly contactLink: Locator;
  private readonly returnsLink: Locator;
  private readonly sitemapLink: Locator;
  private readonly manufacturersLink: Locator;
  private readonly vouchersLink: Locator;
  private readonly affiliatesLink: Locator;
  private readonly specialOffersLink: Locator;
  private readonly myAccountLink: Locator;
  private readonly orderHistoryLink: Locator;
  private readonly wishlistLink: Locator;
  private readonly newsletterLink: Locator;
  private readonly copyright: Locator;
  private readonly paymentMethods: Locator;

  constructor(private readonly page: Page) {
    this.aboutLink = page.locator('a:has-text("Despre Cycle Master")');
    this.privacyLink = page.locator('a:has-text("Politica de confidentialitate")');
    this.termsLink = page.locator('a:has-text("Termeni si conditii")');
    this.shippingLink = page.locator('a:has-text("Livrare si plata")');
    this.anpcLink = page.locator('a:has-text("ANPC")');
    this.contactLink = page.locator('footer a:has-text("Contact")');
    this.returnsLink = page.locator('a:has-text("Returnari")');
    this.sitemapLink = page.locator('a:has-text("Harta sitului")');
    this.manufacturersLink = page.locator('a:has-text("Producatori")');
    this.vouchersLink = page.locator('a:has-text("Vouchere")');
    this.affiliatesLink = page.locator('a:has-text("Afiliati")');
    this.specialOffersLink = page.locator('a:has-text("Oferte speciale")');
    this.myAccountLink = page.locator('footer a:has-text("Contul meu")');
    this.orderHistoryLink = page.locator('footer a:has-text("Istoric comenzi")');
    this.wishlistLink = page.locator('footer a:has-text("Wish List")');
    this.newsletterLink = page.locator('footer a:has-text("Newsletter")');
    this.copyright = page.locator('text=CycleMaster.ro');
    this.paymentMethods = page.locator('img[alt="NETOPIA"], img[alt="MobilPay"]');
  }

  async scrollToFooter() {
    await this.page.evaluate(() => {
      (window as any).scrollTo(0, document.body.scrollHeight);
    });
  }

  async goToAbout() {
    await this.aboutLink.click();
  }

  async goToPrivacy() {
    await this.privacyLink.click();
  }

  async goToTerms() {
    await this.termsLink.click();
  }

  async goToShipping() {
    await this.shippingLink.click();
  }

  async goToANPC() {
    await this.anpcLink.click();
  }

  async goToContact() {
    await this.contactLink.click();
  }

  async goToReturns() {
    await this.returnsLink.click();
  }

  async goToSitemap() {
    await this.sitemapLink.click();
  }

  async goToManufacturers() {
    await this.manufacturersLink.click();
  }

  async goToVouchers() {
    await this.vouchersLink.click();
  }

  async goToAffiliates() {
    await this.affiliatesLink.click();
  }

  async goToSpecialOffers() {
    await this.specialOffersLink.click();
  }

  async goToMyAccount() {
    await this.myAccountLink.click();
  }

  async goToOrderHistory() {
    await this.orderHistoryLink.click();
  }

  async goToWishlist() {
    await this.wishlistLink.click();
  }

  async goToNewsletter() {
    await this.newsletterLink.click();
  }

  async getCopyrightText() {
    return this.copyright.textContent();
  }

  async getPaymentMethodCount() {
    return this.paymentMethods.count();
  }

  async isFooterVisible() {
    return this.copyright.isVisible();
  }
}
