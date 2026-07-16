import { test } from '@playwright/test';
test.describe('Validando flujo acceso a documentacion playwright', () => {
    test('Validando documentacion de locators', async ({ page }) => {
        await page.goto('https://ecommerce-js-test.vercel.app/');
        await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('#name').fill('Juan');
        await page.locator('#email').fill('juan@example.com');
        await page.locator('#password').fill('123456');
        await page.locator('#confirmPassword').fill('123456');
    })
});