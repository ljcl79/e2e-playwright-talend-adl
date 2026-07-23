import test, { expect } from "@playwright/test";

test.describe("Probando Escenarios de Backend", () => {
    test("Sin productos", async ({ page }) => {
        await page.route('**/products', async (route, request) => {
            //await new Promise(resolve => setTimeout(resolve, 10000));
            await route.fulfill({
                status: 200,
                body: JSON.stringify([])
            });
        });
        await page.goto('https://e2e-ecommerce-app.vercel.app/');

        await expect(page.locator('#products-empty')).toBeVisible();
    });

    test("Error de cliente", async ({ page }) => {
        await page.route('**/products', async (route, request) => {
            //await new Promise(resolve => setTimeout(resolve, 10000));
            await route.fulfill({
                status: 403
            });
        });
        await page.goto('https://e2e-ecommerce-app.vercel.app/');

        await expect(page.locator('#products-error')).toHaveText('Se intentó acceso no autorizado');
    });

    test("Error de servidor", async ({ page }) => {
        await page.route('**/products', async (route, request) => {
            //await new Promise(resolve => setTimeout(resolve, 10000));
            await route.fulfill({
                status: 500
            });
        });
        await page.goto('https://e2e-ecommerce-app.vercel.app/');
        await expect(page.locator('#products-error')).toHaveText('Error general de la aplicación');
    })
});