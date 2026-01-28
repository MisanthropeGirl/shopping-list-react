/// <reference types="@testing-library/jest-dom" />
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";
import { ShoppingListContext } from "../../app/ShoppingListContext";

describe("Form", () => {
  test("renders without crashing", () => {
    const addNewItem = jest.fn();
    render(<Form addNewItem={addNewItem} />);

    const input = screen.getByRole("textbox", { name: "Add an item:" });
    const btn: HTMLButtonElement = screen.getByRole("button", { name: "add" });

    expect(screen.getByLabelText(/Add an item/)).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn.disabled).toBe(true);
  });

  test("Button should not be enabled when input is just spaces", () => {
    const user = userEvent.setup();

    const addNewItem = jest.fn();
    render(<Form addNewItem={addNewItem} />);

    const input = screen.getByRole("textbox", { name: "Add an item:" });
    const btn: HTMLButtonElement = screen.getByRole("button", { name: "add" });

    user.type(input, "   ");
    expect(btn.disabled).toBe(true);
  });

  test("Button should be enabled when there is a valid input and disabled when not", async () => {
    const user = userEvent.setup();

    const addNewItem = jest.fn();
    render(<Form addNewItem={addNewItem} />);

    const input = screen.getByRole("textbox", { name: "Add an item:" });
    const btn: HTMLButtonElement = screen.getByRole("button", { name: "add" });

    await user.type(input, "Milk");
    expect(btn.disabled).toBe(false);

    await user.clear(input);
    expect(btn.disabled).toBe(true);
  });

  test("Should show an error message when there is nothing to add", async () => {
    const user = userEvent.setup();

    const addNewItem = jest.fn();
    render(<Form addNewItem={addNewItem} />);

    const input = screen.getByRole("textbox", { name: "Add an item:" });
    const form = input.closest("form")!;

    await user.type(input, "   ");
    fireEvent.submit(form);

    expect(input).toHaveValue("   ");
    expect(screen.queryByText(/Nothing to add/)).toBeInTheDocument();
  });

  test("Should show an error message when there is a duplicate item", async () => {
    const user = userEvent.setup();

    const addNewItem = jest.fn();
    const items = ["Milk", "Butter", "Cheese", "Yogurt"];
    render(
      <ShoppingListContext value={items}>
        <Form addNewItem={addNewItem} />
      </ShoppingListContext>,
    );

    const input = screen.getByRole("textbox", { name: "Add an item:" });
    const btn: HTMLButtonElement = screen.getByRole("button", { name: "add" });

    await user.type(input, "Milk");
    await user.click(btn);

    expect(input).toHaveValue("Milk");
    expect(btn.disabled).toBe(false);
    expect(screen.queryByText(/Item already added/)).toBeInTheDocument();
  });

  test("Should show a success message and reset the form when an item is successfully added", async () => {
    const user = userEvent.setup();

    const addNewItem = jest.fn();
    render(<Form addNewItem={addNewItem} />);

    const input = screen.getByRole("textbox", { name: "Add an item:" });
    const btn: HTMLButtonElement = screen.getByRole("button", { name: "add" });

    await user.type(input, "Milk");
    await user.click(btn);

    expect(input).toHaveValue("");
    expect(btn.disabled).toBe(true);
    expect(screen.queryByText(/Item added/)).toBeInTheDocument();
  });
});
