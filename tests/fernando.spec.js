import { test } from "@playwright/test";
test.describe("primer ejecicio pw", () => {
    //Validando documentación de Locators
    test("primer ejecicio pw", async ({ page }) => {
        await page.goto("https://ecommerce-js-test.vercel.app/");
        await page.getByRole("link", { name: "Register" }).click();
        await page.waitForURL("https://ecommerce-js-test.vercel.app/register");
        await page
            .getByRole("textbox", { name: "Full Name" })
            .fill("Fernando Stubing Alvear");
        await page
            .getByRole("textbox", { name: "Email Address" })
            .fill("fstubing@mail.com");
        await page.getByLabel("Password", { exact: true }).fill("password123");
        await page
            .getByRole("textbox", { name: "Confirm Password" })
            .fill("password123");
        await page.getByRole("button", { name: "Create Account" }).click();
    });
});