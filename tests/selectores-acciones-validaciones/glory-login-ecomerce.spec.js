import { test, expect } from '@playwright/test';
const base_url = 'https://ecommerce-js-test.vercel.app/';

test.describe('Login Ecommerce', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(base_url);
    await page.getByRole('link', { name: 'Login' }).click();
  });

  test('login success', async ({ page }) => {
    const email = page.getByRole('textbox', { name: 'Email Address' });
    const password = page.getByRole('textbox', { name: 'Password' });

    await email.fill('admin@example.com');
    await password.fill('admin123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Hello, Admin User')).toBeVisible();
    await page.getByRole('button', { name: 'Logout' }).click();
  });

  test('login failed invalid email and password', async ({ page }) => {
    const email = page.getByRole('textbox', { name: 'Email Address' });
    const password = page.getByRole('textbox', { name: 'Password' });

    await email.fill('email@invalido.com');
    await password.fill('invalidpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Invalid email or password', { exact: true })).toBeVisible();
  });

  test('login failed email and password empty', async ({ page }) => {
    const email = page.getByRole('textbox', { name: 'Email Address' });

    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(email).toBeFocused();
    expect(await email.evaluate(el => el.checkValidity())).toBe(false);
  });

  test('login failed email empty', async ({ page }) => {
    const email = page.getByRole('textbox', { name: 'Email Address' });
    const password = page.getByRole('textbox', { name: 'Password' });

    await password.fill('admin123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(email).toBeFocused();
    expect(await email.evaluate(el => el.checkValidity())).toBe(false);
  });

  test('login failed password empty', async ({ page }) => {
    const email = page.getByRole('textbox', { name: 'Email Address' });
    const password = page.getByRole('textbox', { name: 'Password' });
    await email.fill('admin@example.com');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(password).toBeFocused();
    expect(await password.evaluate(el => el.checkValidity())).toBe(false);
  });

});