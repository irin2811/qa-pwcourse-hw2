import { test, expect, Locator } from '@playwright/test';
import { fillPaymentForm, chooseEspresso, chooseEspressoMacchiato, chooseCappuccino, checkPurchase } from './page-actions';

test.describe('Coffee Cart Tests', () => {
  let appPage: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    appPage = page.locator('#app');
  });

  test('test check payment: choose espresso and complete payment', async ({ page }) => {
    const name = 'test';
    const email = 'test@example.com';
    const successPurchaseMessage = 'Thanks for your purchase. Please check your email for payment.';

    await chooseEspresso(page);
    await checkPurchase(page);
    await fillPaymentForm(page, name, email);

    await expect(appPage).toContainText(successPurchaseMessage);
  });

  test('test promo message: choose multiple coffees and check discount', async ({ page }) => {
    const discountMessage = 'It\'s your lucky day! Get an extra cup of Mocha for $4.';
    
    await chooseEspresso(page);
    await chooseEspressoMacchiato(page);
    await chooseCappuccino(page);

    await expect(appPage).toContainText(discountMessage);
  });

});