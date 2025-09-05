import { test, expect } from '@fixtures/base.fixture';

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('successful login with valid credentials', async ({ loginPage, page }) => {
    // Arrange
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;

    // Act
    await loginPage.login(email, password);
    
    // Assert
    await expect(page).toHaveURL(/\/(dashboard|home)/);
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('login fails with invalid credentials', async ({ loginPage, page }) => {
    // Act
    await loginPage.login('invalid@email.com', 'wrongpassword');
    
    // Assert
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
    await expect(page).toHaveURL('/login');
  });

  test('login form validation - empty fields', async ({ loginPage, page }) => {
    // Act - Try to submit empty form
    await loginPage.loginButton.click();
    
    // Assert
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('login form validation - invalid email format', async ({ loginPage, page }) => {
    // Act
    await loginPage.emailInput.fill('invalidemail');
    await loginPage.passwordInput.fill('password123');
    await loginPage.loginButton.click();
    
    // Assert
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('remember me functionality', async ({ loginPage, page }) => {
    // Arrange
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;

    // Act
    await loginPage.loginWithRememberMe(email, password);
    
    // Assert
    await expect(page).toHaveURL(/\/(dashboard|home)/);
    
    // Check if remember me cookie is set
    const cookies = await page.context().cookies();
    const rememberMeCookie = cookies.find(cookie => cookie.name === 'remember_me');
    expect(rememberMeCookie).toBeDefined();
  });

  test('forgot password link navigation', async ({ loginPage, page }) => {
    // Act
    await loginPage.clickForgotPassword();
    
    // Assert
    await expect(page).toHaveURL('/forgot-password');
    await expect(page.getByText('Reset Password')).toBeVisible();
  });

  test('sign up link navigation', async ({ loginPage, page }) => {
    // Act
    await loginPage.clickSignUp();
    
    // Assert
    await expect(page).toHaveURL('/signup');
    await expect(page.getByText('Create Account')).toBeVisible();
  });

  test('password field should be masked', async ({ loginPage }) => {
    // Act
    await loginPage.passwordInput.fill('testpassword');
    
    // Assert
    const inputType = await loginPage.passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  });

  test('login button disabled when form is invalid', async ({ loginPage }) => {
    // Initial state - button should be disabled
    expect(await loginPage.isLoginButtonEnabled()).toBe(false);
    
    // Fill only email
    await loginPage.emailInput.fill('test@example.com');
    expect(await loginPage.isLoginButtonEnabled()).toBe(false);
    
    // Fill both fields
    await loginPage.passwordInput.fill('password');
    expect(await loginPage.isLoginButtonEnabled()).toBe(true);
  });

  test('successful login redirects to originally requested page', async ({ loginPage, page }) => {
    // Navigate to protected page first
    await page.goto('/protected-page');
    
    // Should be redirected to login
    await expect(page).toHaveURL('/login');
    
    // Login
    await loginPage.login(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!
    );
    
    // Should be redirected back to protected page
    await expect(page).toHaveURL('/protected-page');
  });
});