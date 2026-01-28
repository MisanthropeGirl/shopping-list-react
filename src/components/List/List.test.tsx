/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import List from "./List";
import { ShoppingListContext } from "../../app/ShoppingListContext";

describe("List", () => {
  test("renders without crashing", () => {
    const items = [] as string[];
    render(
      <ShoppingListContext value={items}>
        <List />
      </ShoppingListContext>,
    );

    expect(screen.getByText(/Your shopping list is currently empty/)).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("Shows the list when there are items", () => {
    const items = ["Milk", "Butter", "Cheese", "Yogurt"];
    render(
      <ShoppingListContext value={items}>
        <List />
      </ShoppingListContext>,
    );

    expect(screen.queryByText(/Your shopping list is currently empty/)).not.toBeInTheDocument();

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(items.length);
  });
});
