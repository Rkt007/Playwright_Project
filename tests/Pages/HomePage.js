import { expect } from "@playwright/test";

export class HomePage {

  constructor(page) {
    this.page = page;
    this.appLogo = page.locator('.app_logo');
    this.productNames = page.locator('.inventory_item_name');
  }

  async verifyHomePageLoaded() {
    await expect(this.appLogo).toBeVisible();
  }

  async verifyProductText(expectedText) {
    await expect(this.productNames.first()).toContainText(expectedText);
  }
}
