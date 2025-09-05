import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;
  readonly navigationMenu: Locator;
  readonly heroSection: Locator;
  readonly featuredProducts: Locator;
  readonly cartIcon: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder('Search...');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.userMenu = page.getByTestId('user-menu');
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.navigationMenu = page.getByRole('navigation');
    this.heroSection = page.getByTestId('hero-section');
    this.featuredProducts = page.getByTestId('featured-products');
    this.cartIcon = page.getByTestId('cart-icon');
    this.cartCount = page.getByTestId('cart-count');
  }

  async goto() {
    await this.navigate('/');
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }

  async navigateToCategory(category: string) {
    await this.navigationMenu.getByText(category).click();
  }

  async getCartItemCount(): Promise<number> {
    const count = await this.cartCount.textContent();
    return parseInt(count || '0', 10);
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async isUserLoggedIn(): Promise<boolean> {
    return await this.userMenu.isVisible();
  }

  async getWelcomeMessage(): Promise<string> {
    const welcomeText = this.page.getByTestId('welcome-message');
    return await welcomeText.textContent() || '';
  }

  async selectProduct(productName: string) {
    await this.page.getByText(productName).click();
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator(`[data-product-name="${productName}"]`);
    await product.getByRole('button', { name: 'Add to Cart' }).click();
  }

  async getSearchResults(): Promise<string[]> {
    const results = await this.page.locator('[data-testid="search-result"]').all();
    const texts = await Promise.all(results.map(async (result) => {
      return await result.textContent() || '';
    }));
    return texts;
  }

  async isHeroSectionVisible(): Promise<boolean> {
    return await this.heroSection.isVisible();
  }

  async getFeaturedProductsCount(): Promise<number> {
    const products = await this.featuredProducts.locator('.product-card').all();
    return products.length;
  }

  async navigateToUserProfile() {
    await this.userMenu.click();
    await this.page.getByText('Profile').click();
  }

  async navigateToOrders() {
    await this.userMenu.click();
    await this.page.getByText('Orders').click();
  }
}