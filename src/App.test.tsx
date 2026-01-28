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
});
