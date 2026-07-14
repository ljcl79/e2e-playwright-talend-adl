import { test, expect } from '@playwright/test';
// test. describe permite agrupar suites de pruebas lógicas
test.describe('Suite de bienvenida a Playwright', () => {
    test('Debe verificar que carga de forma exitosa Santiago', async ({ page }) => {
        // 1. Navegamos url de demostración
        await page.goto('https://ljcl79.github.io/primera-pagina-ia-taller-adl/');
        // 2. Realizamos una aserción básica del título de la página await expect (page). toHaveTitle(/Taller ADL/);
        // 3. Confirmamos que la página contiene la palabra "Santiago"
        await expect(page.locator('body')).toContainText('Santiago');
    });
});