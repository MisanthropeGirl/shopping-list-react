import { test, expect } from "@playwright/test";

test.describe("Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("Button should not be enabled when input is just spaces", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const btn = page.getByRole("button", { name: /add/i });

    await input.fill("   ");
    await expect(btn).toBeDisabled();
  });

  test("Button should be enabled when there is a valid input and disabled when not", async ({
    page,
  }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const btn = page.getByRole("button", { name: /add/i });

    await input.fill("Milk");
    await expect(btn).toBeEnabled();

    await input.clear();
    await expect(btn).toBeDisabled();
  });

  test("Should show a success message and reset the form when an item is successfully added", async ({
    page,
  }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const btn = page.getByRole("button", { name: /add/i });

    await input.fill("Milk");
    await btn.click();

    const list = page.getByRole("list");

    await expect(input).toHaveValue("");
    await expect(btn).toBeDisabled();
    await expect(list).toBeVisible;
    await expect(list).toContainText("Milk");

    const msg = page.getByTestId("feedback");
    await expect(msg).toHaveText(/Item added/);
    await expect(msg).not.toHaveClass("msg-error");
  });

  test("Should show an error message when there is a duplicate item", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const btn = page.getByRole("button", { name: /add/i });

    await input.fill("Milk");
    await btn.click();

    await expect(input).toHaveValue("");
    await expect(btn).toBeDisabled();
    await expect(page.getByRole("list")).toContainText("Milk");

    await input.fill("Milk");
    await btn.click();

    await expect(input).toHaveValue("Milk");
    await expect(btn).toBeEnabled();

    const msg = page.getByTestId("feedback");
    await expect(msg).toHaveText(/Item already added/);
    await expect(msg).toHaveClass("msg msg-error");
  });

  test("Should show a success message when an item is removed and hide the list if all items removed", async ({
    page,
  }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const btnAdd = page.getByRole("button", { name: /add/i });

    await input.fill("Milk");
    await btnAdd.click();

    await input.fill("Butter");
    await btnAdd.click();

    const list = page.getByRole("list");
    const btnRemoveMilk = page.getByRole("button", { name: /remove milk/i });
    const btnRemoveButter = page.getByRole("button", { name: /remove butter/i });

    await btnRemoveMilk.click();

    const msg = page.getByTestId("feedback");
    await expect(msg).toHaveText(/Item removed/);
    await expect(msg).not.toHaveClass("msg-error");

    await btnRemoveButter.click();

    await expect(list).not.toBeVisible();
    await expect(page.getByText(/Your shopping list is currently empty/)).toBeVisible();
  });

  test("Should allow an item to be crossed off the list", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "Add an item:" });
    const btnAdd = page.getByRole("button", { name: /add/i });

    await input.fill("Milk");
    await btnAdd.click();

    const btnCrossOffMilk = page.getByRole("button", { name: /cross off milk/i });
    await btnCrossOffMilk.click();

    await expect(btnCrossOffMilk).not.toBeVisible();
  });
});
