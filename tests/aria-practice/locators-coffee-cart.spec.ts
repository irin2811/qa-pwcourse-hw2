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

  await page.getByTestId("Espresso").click();
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (1)');
});

test('test cart total two drinks', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId("checkout")).toContainText('Total: $0.00');

  await expect(page.getByRole('heading', { name: 'Espresso $10.00' })).toContainText('Espresso $10.00');
  await page.getByTestId("Espresso").click();

  await expect(page.getByRole('heading', { name: 'Espresso Macchiato $12.00' })).toContainText('Espresso Macchiato $12.00');
  await page.getByTestId("Espresso_Macchiato").click();

  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (2)');
  await expect(page.getByTestId("checkout")).toContainText('Total: $22.00');
});

test('test check payment', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId("checkout")).toContainText('Total: $0.00');

  await page.getByTestId("Espresso").click();
  await page.getByTestId("checkout").click();

  await expect(page.getByRole('heading', { name: 'Payment details' })).toContainText('Payment details');
  await page.getByRole('textbox', { name: 'Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('button', { name: 'Thanks for your purchase. Please check your email for payment.' })).toBeVisible();
});

test('test promo message', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId("checkout")).toContainText('Total: $0.00');

  await page.getByTestId("Espresso").click();
  await page.getByTestId("Espresso_Macchiato").click();
  await page.getByTestId("Cappuccino").click();

  await expect(page.locator('.promo > span')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
});