/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import Message from "./Message";

describe("Message", () => {
  test("Should show nothing when feedback is null", () => {
    render(<Message feedback={null} />);

    expect(screen.queryByTestId("feedback")).not.toBeInTheDocument();
  });

  test("Should show error messages", () => {
    render(<Message feedback={{ msg: "Nothing to add", type: "error" }} />);

    const el = screen.getByTestId("feedback");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("Nothing to add");
    expect(el.classList).toContain("msg-error");
  });

  test("Should show non-error messages", () => {
    render(<Message feedback={{ msg: "Item added" }} />);

    const el = screen.getByTestId("feedback");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("Item added");
    expect(el.classList).not.toContain("msg-error");
  });
});
