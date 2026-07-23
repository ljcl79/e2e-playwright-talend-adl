import test from "@playwright/test";

test.describe("Probando Escenarios de Backend", () => {
    test("Interceptando imagenes", async ({ page }) => {
        await page.route('**\/*.{png,jpg,jpeg}', route => route.abort());

        await page.goto('https://ecommerce-js-test.vercel.app/');
        await page.getByRole('textbox', { name: 'Search products...' }).fill('mens');

        //Criterios de aceptación

    });

    test("Actuando ante error del backend", async ({ page }) => {
        await page.route('**/products', async (route, request) => {
            //await new Promise(resolve => setTimeout(resolve, 10000));
            await route.fulfill({
                status: 200,
                body: JSON.stringify([])
            });
        });
        await page.goto('https://ecommerce-js-test.vercel.app/');
        await page.getByRole('textbox', { name: 'Search products...' }).fill('mens');

    })
});