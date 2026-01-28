import { test, expect } from "@playwright/test";

test.describe("Setup", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("List is present", async ({ page }) => {
    await expect(page.getByRole("list")).toBeVisible();
  });
});
