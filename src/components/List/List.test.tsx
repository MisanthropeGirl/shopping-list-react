/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import type { Item } from "../../typings";
import { ShoppingListContext } from "../../app/ShoppingListContext";
import List from "./List";

const crossOffItem = jest.fn();
const removeUnwantedItem = jest.fn();
const setFeedback = jest.fn();

describe("List", () => {
  test("renders without crashing", () => {
    const items = [] as Item[];
    render(
      <ShoppingListContext value={items}>
        <List
          crossOffItem={crossOffItem}
          removeUnwantedItem={removeUnwantedItem}
          setFeedback={setFeedback}
        />
      </ShoppingListContext>,
    );

    expect(screen.getByText(/Your shopping list is currently empty/)).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("Shows the list when there are items", () => {
    const items = [
      { name: "Milk", crossedOff: false },
      { name: "Butter", crossedOff: false },
      { name: "Cheese", crossedOff: false },
      { name: "Yogurt", crossedOff: false },
    ];
    render(
      <ShoppingListContext value={items}>
        <List
          crossOffItem={crossOffItem}
          removeUnwantedItem={removeUnwantedItem}
          setFeedback={setFeedback}
        />
      </ShoppingListContext>,
    );

    expect(screen.queryByText(/Your shopping list is currently empty/)).not.toBeInTheDocument();

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(items.length);

    expect(list).toHaveTextContent("Milk");
    expect(list).toHaveTextContent("Butter");
    expect(list).toHaveTextContent("Cheese");
    expect(list).toHaveTextContent("Yogurt");
  });
});
