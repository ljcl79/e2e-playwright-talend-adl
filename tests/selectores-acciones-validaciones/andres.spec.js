import { test, expect } from '@playwright/test'
test.describe('Validando flujo de acceso a documentación de playwright', () => {
    test('Validando documentación de Locators', async ({ page }) => {
        await page.goto('https://ecommerce-js-test.vercel.app/')
        await page.getByRole('link', { name: 'Register' }).click()
        await page.getByRole('textbox', { name: 'Full Name' }).fill('Juan Perez')
        await page
            .getByRole('textbox', { name: 'Email Address' })
            .fill('correo@correo.cl')
        await page.getByLabel('Password', { exact: true }).fill('12345678')
        await page
            .getByRole('textbox', { name: 'Confirm Password' })
            .fill('12345678')
        await page.getByRole('button', { name: 'Create Account' }).click()
        await expect(page.getByText('Hello, Juan perez')).toBeVisible()
    })
})