import React from "react";
import { CounterPage } from "./index";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReduxStoreProvider } from "@/store";

describe("Count change when click buttons", () => {
  let showCounter: Element;
  let increaseButton: Element;
  let decreaseButton: Element;
  let resetButton: Element;

  beforeEach(async () => {
    await render(
      <ReduxStoreProvider>
        <CounterPage />
      </ReduxStoreProvider>,
    );
    showCounter = screen.getByTestId("show-counter");
    increaseButton = screen.getByTestId("increase");
    decreaseButton = screen.getByTestId("decrease");
    resetButton = screen.getByTestId("reset");
    fireEvent.click(resetButton);
  });

  it("Count increase", () => {
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    expect(showCounter).toHaveTextContent("Count is 3");
  });

  it("Count decrease", () => {
    fireEvent.click(decreaseButton);
    fireEvent.click(decreaseButton);
    expect(showCounter).toHaveTextContent("Count is -2");
  });
});
