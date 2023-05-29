import { screen, render } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import ReactDOM from "react-dom";
import { ReactNode, ReactPortal } from "react";

const oldCreatePortal = ReactDOM.createPortal;
beforeAll(() => {
  ReactDOM.createPortal = (node: ReactNode): ReactPortal => node as ReactPortal;
});

afterAll(() => {
  ReactDOM.createPortal = oldCreatePortal;
});

function checkPageWithoutItem() {
  render(<HomePage />);

  const notResult = screen.getByText("No hero yet");
  const pagination = screen.getByTestId("pagination");
  const paginationArrow = screen.getByTestId("pagination-arrow-right");
  const buttonOpenForm = screen.getByTestId("button-open-form");

  expect(notResult).toBeInTheDocument();
  expect(pagination).toBeInTheDocument();
  expect(paginationArrow).toBeInTheDocument();
  expect(buttonOpenForm).toBeInTheDocument();
}

describe("Card page without item", () => {
  test("Check page without item", () => {
    checkPageWithoutItem();
  });
});
