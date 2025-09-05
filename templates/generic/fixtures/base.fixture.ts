import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { HomePage } from '@pages/home.page';
import { CheckoutPage } from '@pages/checkout.page';

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';