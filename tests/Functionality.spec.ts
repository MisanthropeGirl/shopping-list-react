import { test, expect } from "@playwright/test";

test.describe("Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("Button should not be enabled when input is just spaces", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const button = page.getByRole("button", { name: /add/i });

    await input.fill("   ");
    await expect(button).toBeDisabled();
  });

  test("Button should be enabled when there is a valid input and disabled when not", async ({
    page,
  }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const button = page.getByRole("button", { name: /add/i });

    await input.fill("Milk");
    await expect(button).toBeEnabled();

    await input.clear();
    await expect(button).toBeDisabled();
  });

  test("Should show a success message and reset the form when an item is successfully added", async ({
    page,
  }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const button = page.getByRole("button", { name: /add/i });

    await input.fill("Milk");
    await button.click();

    await expect(input).toHaveValue("");
    await expect(button).toBeDisabled();
    await expect(page.getByText(/Item added/)).toBeVisible();
    await expect(page.getByRole("list")).toContainText("Milk");
  });

  test("Should show an error message when there is a duplicate item", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const button = page.getByRole("button", { name: /add/i });

    await input.fill("Milk");
    await button.click();

    await expect(input).toHaveValue("");
    await expect(button).toBeDisabled();
    await expect(page.getByRole("list")).toContainText("Milk");

    await input.fill("Milk");
    await button.click();

    await expect(input).toHaveValue("Milk");
    await expect(button).toBeEnabled();
    await expect(page.getByText(/Item already added/)).toBeVisible();
  });
});
