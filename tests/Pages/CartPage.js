import { expect } from "@playwright/test";

export class CartPage {

  constructor(page) {
    this.page = page;

    // Add to cart button
    this.addBackpackBtn = page.locator('#add-to-cart-sauce-labs-backpack');

    // Cart icon
    this.cartIcon = page.locator('.shopping_cart_link');

    // Checkout button
    this.checkoutBtn = page.locator('#checkout');

    // Checkout: Your Information
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');

    // Continue button
    this.continueBtn = page.locator('#continue'); 

    // then finish

    this.finish=page.locator('#finish');
  }

  async addBackpackToCart() {
    await this.addBackpackBtn.click();
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async clickCheckout() {
    await expect(this.checkoutBtn).toBeVisible();
    await this.checkoutBtn.click();
  }

  async fillFirstName(name) {
    await this.firstNameInput.fill(name);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillZipCode(zipCode) {
    await this.zipCodeInput.fill(zipCode);
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async clickonfinish() {
    await this.finish.click();
  }

  
}
