import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { LoginForm } from "./Login";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("can render and update a counter", () => {
  act(() => {
    ReactDOM.render(<LoginForm />, container);
  });
  const title = container.querySelector("h2");
  //   const label = container.querySelector("p");
  expect(title.textContent).toBe("Login");

  // Test second render and componentDidUpdate
  //   act(() => {
  //     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  //   });
  //   expect(label.textContent).toBe("You clicked 1 times");
  //   expect(document.title).toBe("You clicked 1 times");
});
