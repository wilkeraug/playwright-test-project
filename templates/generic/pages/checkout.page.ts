import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateSelect: Locator;
  readonly zipCodeInput: Locator;
  readonly countrySelect: Locator;
  readonly cardNumberInput: Locator;
  readonly cardNameInput: Locator;
  readonly expiryInput: Locator;
  readonly cvvInput: Locator;
  readonly placeOrderButton: Locator;
  readonly orderSummary: Locator;
  readonly totalPrice: Locator;
  readonly shippingOptions: Locator;
  readonly paymentMethods: Locator;
  readonly promoCodeInput: Locator;
  readonly applyPromoButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByLabel('Email');
    this.phoneInput = page.getByLabel('Phone');
    this.addressInput = page.getByLabel('Address');
    this.cityInput = page.getByLabel('City');
    this.stateSelect = page.getByLabel('State');
    this.zipCodeInput = page.getByLabel('ZIP Code');
    this.countrySelect = page.getByLabel('Country');
    this.cardNumberInput = page.getByLabel('Card Number');
    this.cardNameInput = page.getByLabel('Name on Card');
    this.expiryInput = page.getByLabel('Expiry Date');
    this.cvvInput = page.getByLabel('CVV');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.orderSummary = page.getByTestId('order-summary');
    this.totalPrice = page.getByTestId('total-price');
    this.shippingOptions = page.getByTestId('shipping-options');
    this.paymentMethods = page.getByTestId('payment-methods');
    this.promoCodeInput = page.getByPlaceholder('Promo Code');
    this.applyPromoButton = page.getByRole('button', { name: 'Apply' });
  }

  async goto() {
    await this.navigate('/checkout');
  }

  async fillShippingAddress(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateSelect.selectOption(data.state);
    await this.zipCodeInput.fill(data.zipCode);
    await this.countrySelect.selectOption(data.country);
  }

  async fillPaymentDetails(data: {
    cardNumber: string;
    cardName: string;
    expiry: string;
    cvv: string;
  }) {
    await this.cardNumberInput.fill(data.cardNumber);
    await this.cardNameInput.fill(data.cardName);
    await this.expiryInput.fill(data.expiry);
    await this.cvvInput.fill(data.cvv);
  }

  async selectShippingOption(option: string) {
    await this.shippingOptions.getByText(option).click();
  }

  async selectPaymentMethod(method: string) {
    await this.paymentMethods.getByText(method).click();
  }

  async applyPromoCode(code: string) {
    await this.promoCodeInput.fill(code);
    await this.applyPromoButton.click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async getTotalPrice(): Promise<string> {
    return await this.totalPrice.textContent() || '';
  }

  async getOrderSummaryItems(): Promise<string[]> {
    const items = await this.orderSummary.locator('.item').all();
    const texts = await Promise.all(items.map(async (item) => {
      return await item.textContent() || '';
    }));
    return texts;
  }

  async isPlaceOrderButtonEnabled(): Promise<boolean> {
    return await this.placeOrderButton.isEnabled();
  }

  async waitForOrderConfirmation() {
    await this.page.waitForURL(/\/order-confirmation/, { timeout: 10000 });
  }

  async getOrderConfirmationNumber(): Promise<string> {
    const confirmationNumber = this.page.getByTestId('confirmation-number');
    return await confirmationNumber.textContent() || '';
  }

  async validateShippingForm(): Promise<boolean> {
    // Check if all required fields are filled
    const fields = [
      this.firstNameInput,
      this.lastNameInput,
      this.emailInput,
      this.addressInput,
      this.cityInput,
      this.zipCodeInput
    ];

    for (const field of fields) {
      const value = await field.inputValue();
      if (!value) return false;
    }
    return true;
  }

  async getShippingCost(): Promise<string> {
    const shippingCost = this.page.getByTestId('shipping-cost');
    return await shippingCost.textContent() || '';
  }

  async getTaxAmount(): Promise<string> {
    const tax = this.page.getByTestId('tax-amount');
    return await tax.textContent() || '';
  }

  async getDiscountAmount(): Promise<string> {
    const discount = this.page.getByTestId('discount-amount');
    return await discount.textContent() || '';
  }
}