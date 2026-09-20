import { test, expect } from '@playwright/test';

test('test empty cart page', async ({ page }) => {
  await page.goto('/'); 
  await expect(page.locator('[aria-label="Cart page"]')).toContainText('cart (0)');

  await page.locator('[aria-label="Cart page"]').click();
  await expect(page.locator('.list:has(p:has-text(\'No coffee, go add some.\'))')).toBeVisible();
});

test('test cart counter', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[aria-label="Cart page"]')).toContainText('cart (0)');

  await page.locator('[aria-label="Espresso"]').click();
  await expect(page.locator('[aria-label="Cart page"]')).toContainText('cart (1)');
});

test('test cart total two drinks', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[aria-label="Proceed to checkout"]')).toContainText('Total: $0.00');

  await page.locator('[aria-label="Espresso"]').click();
  await page.locator('[aria-label="Espresso Macchiato"]').click();

  await expect(page.locator('[aria-label="Cart page"]')).toContainText('cart (2)');
  await expect(page.locator('[aria-label="Proceed to checkout"]')).toContainText('Total: $22.00');
});

test('test check payment', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[aria-label="Proceed to checkout"]')).toContainText('Total: $0.00');

  await page.locator('[aria-label="Espresso"]').click();
  await page.locator('[aria-label="Proceed to checkout"]').click();

  await expect(page.locator('h1')).toContainText('Payment details');
  await page.locator('[aria-label="Payment form"] #name').fill('test');
  await page.locator('[aria-label="Payment form"] #email').fill('test@example.com');
  await page.locator('[aria-label="Payment form"] button:has-text("Submit")').click();

  await expect(page.locator('.snackbar')).toHaveText('Thanks for your purchase. Please check your email for payment.');
});

test('test promo message', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[aria-label="Proceed to checkout"]')).toContainText('Total: $0.00');

  await page.locator('[aria-label="Espresso"]').click();
  await page.locator('[aria-label="Espresso Macchiato"]').click();
  await page.locator('[aria-label="Cappuccino"]').click();

  await expect(page.locator('.promo > span')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
});