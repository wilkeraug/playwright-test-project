import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '') {
    await this.page.goto(path);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `screenshots/${name}.png`, 
      fullPage: true 
    });
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForElement(selector: string, timeout: number = 30000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async clickAndWaitForNavigation(selector: string) {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(selector)
    ]);
  }

  async fillInput(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async selectOption(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async isEnabled(selector: string): Promise<boolean> {
    return await this.page.isEnabled(selector);
  }

  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async reload() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }

  async acceptDialog() {
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }

  async dismissDialog() {
    this.page.on('dialog', async dialog => {
      await dialog.dismiss();
    });
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async dragAndDrop(source: string, target: string) {
    await this.page.dragAndDrop(source, target);
  }

  async uploadFile(selector: string, filePath: string) {
    await this.page.setInputFiles(selector, filePath);
  }

  async clearInput(selector: string) {
    await this.page.fill(selector, '');
  }

  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  async hover(selector: string) {
    await this.page.hover(selector);
  }

  async doubleClick(selector: string) {
    await this.page.dblclick(selector);
  }

  async rightClick(selector: string) {
    await this.page.click(selector, { button: 'right' });
  }

  async getCookies() {
    return await this.page.context().cookies();
  }

  async setCookie(cookie: any) {
    await this.page.context().addCookies([cookie]);
  }

  async clearCookies() {
    await this.page.context().clearCookies();
  }

  async getLocalStorage(key: string) {
    return await this.page.evaluate((key) => {
      return localStorage.getItem(key);
    }, key);
  }

  async setLocalStorage(key: string, value: string) {
    await this.page.evaluate(([key, value]) => {
      localStorage.setItem(key, value);
    }, [key, value]);
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => {
      localStorage.clear();
    });
  }
}