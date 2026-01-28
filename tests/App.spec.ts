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

  test("List placeholder is present", async ({ page }) => {
    await expect(page.getByText(/Your shopping list is currently empty/)).toBeVisible();
    await expect(page.getByRole("list")).not.toBeVisible();
  });

  test("Form is present", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const button = page.getByRole("button", { name: /add/i });

    await expect(page.getByLabel(/Add an item/)).toBeVisible();

    await expect(input).toBeVisible();
    await expect(input).toHaveValue("");

    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
  });
});
