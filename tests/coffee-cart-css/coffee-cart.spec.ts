import { test, expect } from '@playwright/test';

test('test empty cart page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href="/cart"]')).toContainText('cart (0)');

  await page.locator('a[href="/cart"]').click();
  await expect(page.locator('.list > p')).toHaveText('No coffee, go add some.');
});

test('test cart counter', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href="/cart"]')).toContainText('cart (0)');

  await page.locator('[data-test="Espresso"]').click();
  await expect(page.locator('a[href="/cart"]')).toContainText('cart (1)');
});

test('test cart total two drinks', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00');

  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();

  await expect(page.locator('a[href="/cart"]')).toContainText('cart (2)');
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $22.00');
});

test('test check payment', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00');

  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();

  await expect(page.locator('.modal h1')).toContainText('Payment details');
  await page.locator('#name').fill('test');
  await page.locator('#email').fill('test@example.com');
  await page.locator('#submit-payment').click();

  await expect(page.locator('.snackbar')).toHaveText('Thanks for your purchase. Please check your email for payment.');
});

test('test promo message', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00');

  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();

  await expect(page.locator('.promo > span')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
});
