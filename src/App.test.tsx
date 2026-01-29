/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("renders without crashing", () => {
    render(<App />);

    expect(screen.getByText(/Shopping List/)).toBeInTheDocument();
  });

  test("Item is added to the list", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole("textbox", { name: "Add an item:" });
    const btn: HTMLButtonElement = screen.getByRole("button", { name: "add" });

    await user.type(input, "Milk");
    await user.click(btn);

    expect(screen.getByRole("list").children).toHaveLength(1);
  });

  test("Removes an item from the list", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole("textbox", { name: "Add an item:" });
    const btnAdd: HTMLButtonElement = screen.getByRole("button", { name: "add" });

    await user.type(input, "Milk");
    await user.click(btnAdd);

    const list = screen.getByRole("list");

    expect(list.children).toHaveLength(1);
    expect(list).toHaveTextContent("Milk");

    await user.type(input, "Butter");
    await user.click(btnAdd);

    expect(list.children).toHaveLength(2);
    expect(list).toHaveTextContent("Butter");

    const btnRemoveMilk = screen.getByRole("button", { name: /remove milk/i });
    const btnRemoveButter = screen.getByRole("button", { name: /remove butter/i });

    await user.click(btnRemoveMilk);

    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(1);
    expect(list).not.toHaveTextContent("Milk");

    await user.click(btnRemoveButter);

    expect(list).not.toBeInTheDocument();
  });

  test("Item can be crossed off", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole("textbox", { name: "Add an item:" });
    const btnAdd: HTMLButtonElement = screen.getByRole("button", { name: "add" });

    await user.type(input, "Milk");
    await user.click(btnAdd);

    const list = screen.getByRole("list");

    expect(list.children).toHaveLength(1);
    expect(list).toHaveTextContent("Milk");

    const btnCrossOffMilk = screen.getByRole("button", { name: /cross off milk/i });
    await user.click(btnCrossOffMilk);

    expect(btnCrossOffMilk).not.toBeInTheDocument();
  });
});
