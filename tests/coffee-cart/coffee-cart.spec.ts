import { test, expect } from '@playwright/test';

test('test empty cart page', async ({ page }) => {
  await page.goto('/'); 

  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (0)'); 

  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.getByText('No coffee, go add some.')).toBeVisible();
});

test('test cart counter', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (0)');
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (1)');
});

test('test cart total two drinks', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00');

  await expect(page.getByRole('heading', { name: 'Espresso $' })).toBeVisible();
  await expect(page.locator('#app')).toContainText('Espresso $10.00');
  await expect(page.getByRole('heading', { name: 'Espresso Macchiato $' })).toBeVisible();
  await expect(page.locator('#app')).toContainText('Espresso Macchiato $12.00');

  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();

  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (2)');
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $22.00');
});

test('test check payment', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00');

  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();

  await expect(page.locator('h1')).toContainText('Payment details');
  await page.getByRole('textbox', { name: 'Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@ex.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
});

test('test promo message', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();

  await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
});