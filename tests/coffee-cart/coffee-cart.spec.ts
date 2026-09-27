import { test, expect } from '@playwright/test';

test('test empty cart page', async ({ page }) => {
  await page.goto('/'); 

  const cartLink = page.getByRole('link', { name: 'Cart page' });
  const emptyCartMessage = page.getByText('No coffee, go add some.');

  await expect(cartLink).toContainText('cart (0)'); 
  await cartLink.click();
  await expect(emptyCartMessage).toBeVisible();
});

test('test cart counter', async ({ page }) => {
  await page.goto('/');

  const cartLink = page.getByRole('link', { name: 'Cart page' });
  const espressoCupLocator = page.locator('[data-test="Espresso"]');

  await expect(cartLink).toContainText('cart (0)');
  await espressoCupLocator.click();
  await expect(cartLink).toContainText('cart (1)');
});

test('test cart total two drinks', async ({ page }) => {
  await page.goto('/');

  const appPage = page.locator('#app');
  const cartLink = page.getByRole('link', { name: 'Cart page' });
  const checkoutLocator = page.locator('[data-test="checkout"]');
  const espressoCupTitle = page.getByRole('heading', { name: 'Espresso $' });
  const espressoCupLocator = page.locator('[data-test="Espresso"]');
  const espressoMacchiatoCupTitle = page.getByRole('heading', { name: 'Espresso Macchiato $' });
  const espressoMacchiatoCupLocator = page.locator('[data-test="Espresso_Macchiato"]')

  await expect(checkoutLocator).toBeVisible();
  await expect(checkoutLocator).toContainText('Total: $0.00');

  await expect(espressoCupTitle).toBeVisible();
  await expect(appPage).toContainText('Espresso $10.00');
  await expect(espressoMacchiatoCupTitle).toBeVisible();
  await expect(appPage).toContainText('Espresso Macchiato $12.00');

  await espressoCupLocator.click();
  await espressoMacchiatoCupLocator.click();

  await expect(cartLink).toContainText('cart (2)');
  await expect(checkoutLocator).toContainText('Total: $22.00');
});

test('test check payment', async ({ page }) => {
  await page.goto('/');

  const appPage = page.locator('#app');
  const checkoutLocator = page.locator('[data-test="checkout"]');
  const espressoCupLocator = page.locator('[data-test="Espresso"]');
  const paymentHeader = page.locator('h1');
  const nameField = page.getByRole('textbox', { name: 'Name' });
  const emailField = page.getByRole('textbox', { name: 'Email' });
  const submitButton = page.getByRole('button', { name: 'Submit' });
  const successPurchaseMessage = 'Thanks for your purchase. Please check your email for payment.';

  await expect(checkoutLocator).toBeVisible();
  await expect(checkoutLocator).toContainText('Total: $0.00');

  await espressoCupLocator.click();
  await checkoutLocator.click();

  await expect(paymentHeader).toContainText('Payment details');
  await nameField.fill('test');
  await emailField.fill('test@ex.com');
  await submitButton.click();

  await expect(appPage).toContainText(successPurchaseMessage);
});

test('test promo message', async ({ page }) => {
  await page.goto('/');

  const appPage = page.locator('#app');
  const checkoutLocator = page.locator('[data-test="checkout"]');
  const espressoCupLocator = page.locator('[data-test="Espresso"]');
  const espressoMacchiatoCupLocator = page.locator('[data-test="Espresso_Macchiato"]')
  const cappuccinoCupLocator = page.locator('[data-test="Cappuccino"]');
  const discountMessage = 'It\'s your lucky day! Get an extra cup of Mocha for $4.';

  await expect(checkoutLocator).toContainText('Total: $0.00');
  await espressoCupLocator.click();
  await espressoMacchiatoCupLocator.click();
  await cappuccinoCupLocator.click();

  await expect(appPage).toContainText(discountMessage);
});