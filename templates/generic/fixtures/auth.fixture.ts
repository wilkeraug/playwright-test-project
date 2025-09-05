import { test as base } from '@fixtures/base.fixture';
import { Page } from '@playwright/test';

type AuthFixtures = {
  authenticatedPage: Page;
  adminPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ browser }, use) => {
    // Create a new context with saved auth state
    const context = await browser.newContext({
      storageState: 'auth/user.json' // This file should be created after login
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  adminPage: async ({ browser }, use) => {
    // Create a new context with admin auth state
    const context = await browser.newContext({
      storageState: 'auth/admin.json' // This file should be created after admin login
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';

// Helper function to save authentication state
export async function saveAuthState(page: Page, path: string) {
  await page.context().storageState({ path });
}

// Helper function to login and save state
export async function authenticateUser(page: Page, email: string, password: string, statePath: string) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for successful login
  await page.waitForURL(/\/(dashboard|home)/);
  
  // Save the authentication state
  await saveAuthState(page, statePath);
}