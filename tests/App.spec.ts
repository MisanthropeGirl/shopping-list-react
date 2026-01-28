import { test, expect } from "@playwright/test";

test.describe("Setup", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("App has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Shopping List - Clarissa Clement/);
  });

  test("Title is on screen", async ({ page }) => {
    await expect(page.getByText(/Shopping List/)).toBeVisible();
  });
});
