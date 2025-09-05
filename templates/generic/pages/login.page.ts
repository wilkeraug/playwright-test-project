import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly signUpLink: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByTestId('error-message');
    this.forgotPasswordLink = page.getByText('Forgot Password?');
    this.rememberMeCheckbox = page.getByLabel('Remember me');
    this.signUpLink = page.getByText('Sign Up');
    this.successMessage = page.getByTestId('success-message');
  }

  async goto() {
    await this.navigate('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithRememberMe(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  async getSuccessMessage(): Promise<string> {
    return await this.successMessage.textContent() || '';
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickSignUp() {
    await this.signUpLink.click();
  }

  async clearLoginForm() {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  async isLoggedIn(): Promise<boolean> {
    // Check if user is redirected to dashboard or home page
    const url = await this.getUrl();
    return url.includes('/dashboard') || url.includes('/home');
  }

  async waitForLoginToComplete() {
    await this.page.waitForURL(/\/(dashboard|home)/, { timeout: 10000 });
  }

  async getEmailValidationError(): Promise<string> {
    const emailError = this.page.getByTestId('email-error');
    return await emailError.textContent() || '';
  }

  async getPasswordValidationError(): Promise<string> {
    const passwordError = this.page.getByTestId('password-error');
    return await passwordError.textContent() || '';
  }
}