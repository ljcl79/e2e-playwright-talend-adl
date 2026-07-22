import test, { expect } from "@playwright/test";

const nombreUsuario = "tomsmith";

test.describe("Pruebas sobre el proceso de compra", () => {
    test("Login válido", async ({ page }) => {
        const passwordUsuario = "SuperSecretPassword!";

        await page.goto('https://the-internet.herokuapp.com/login');
        await page.locator('#username').fill(nombreUsuario);
        await page.locator('#password').fill(passwordUsuario);
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    });

    test("Login inválido", async ({ page }) => {
        const passwordUsuario = "este no es password!";

        await page.goto('https://the-internet.herokuapp.com/login');
        await page.locator('#username').fill(nombreUsuario);
        await page.locator('#password').fill(passwordUsuario);
        await page.getByRole('button', { name: 'Login' }).click();
        /*
        await expect(page.locator('div.flash.error')).toBeVisible();
        await expect(page.locator('div.flash.error')).toHaveText(/Invalid password/);
        */
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
    });
})
