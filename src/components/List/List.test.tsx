/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import List from "./List";

test("renders without crashing", () => {
  render(<List />);

  expect(screen.getByRole("list")).toBeInTheDocument();
});
