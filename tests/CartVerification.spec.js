import { test, expect } from "@playwright/test";
import { LoginPage } from "./Pages/LoginPage.js";
import { HomePage } from "./Pages/HomePage.js";
import { CartPage } from "./Pages/CartPage.js";

test('Verification of cart', async ({ page }) => {

  const loginPageObj = new LoginPage(page);
  const homePageObj = new HomePage(page);
  const CartPageobj = new CartPage(page);
  

  await loginPageObj.openApplication();
  await loginPageObj.login("standard_user", "secret_sauce");

  await expect(page).toHaveURL(/inventory/);

  await homePageObj.verifyHomePageLoaded();
  await homePageObj.verifyProductText("Sauce Labs Backpack");

  await CartPageobj.addBackpackToCart();
await CartPageobj.openCart();
await CartPageobj.clickCheckout();

await CartPageobj.fillFirstName("Rahul");
await CartPageobj.fillLastName("Kumar");
await CartPageobj.fillZipCode("560001");

await CartPageobj.clickContinue();
await CartPageobj.clickonfinish();


});
