/*
Hacer un set de pruebas de comportamientos entre front y back:

Site: https://github.com/ljcl79/e2e-playwright-talend-adl 
Escenarios:
0 productos retornados. Esperado: Mensaje de que no hay productos disponibles.
Error 403. Mensaje de que se intentó una operación no valida.
Error 500. Mensaje de que ocurrió un error de backend
*/

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