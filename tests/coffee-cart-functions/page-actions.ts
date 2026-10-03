import { Page, expect } from '@playwright/test';

export async function chooseEspresso(page: Page) {
  const espressoCupLocator = page.locator('[data-test="Espresso"]');
  await espressoCupLocator.click();
}

export async function chooseEspressoMacchiato(page: Page) {
  const espressoMacchiatoCupLocator = page.locator('[data-test="Espresso_Macchiato"]');
  await espressoMacchiatoCupLocator.click();
}

export async function chooseCappuccino(page: Page) {
  const cappuccinoCupLocator = page.locator('[data-test="Cappuccino"]');
  await cappuccinoCupLocator.click();
}

export async function checkPurchase(page: Page) {
  const checkoutLocator = page.locator('[data-test="checkout"]');
  await checkoutLocator.click();
}

export async function fillPaymentForm(page: Page, name: string, email: string) {
  const nameField = page.getByRole('textbox', { name: 'Name' });
  const emailField = page.getByRole('textbox', { name: 'Email' });
  const submitButton = page.getByRole('button', { name: 'Submit' });

  await nameField.fill(name);
  await emailField.fill(email);
  await submitButton.click();
}