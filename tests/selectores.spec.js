import { test, expect } from "@playwright/test";

test.describe("Validando flujo de acceso a documentación de playwright", () => {

    test("Validando documentación de Locators", async ({ page }) => {
        // 1. Navega a la home
        await page.goto('https://playwright.dev/');
        await page.getByRole('link', { name: 'Get started' }).click();

        await page.waitForURL('https://playwright.dev/docs/intro');
        // 3. Abre el modal de búsqueda PRIMERO
        await page.getByRole('button', { name: 'Search' }).click();

        // 4. Espera que el input del modal sea visible
        const searchInput = page.locator('#docsearch-input');
        await searchInput.waitFor({ state: 'visible' });

        // 5. Escribe y ejecuta la búsqueda
        await searchInput.pressSequentially('Locators');

        // 6. Valida el resultado
        await expect(
            page.getByRole('link', { name: 'Filtering Locators Locators' })
        ).toBeVisible();
    });

});