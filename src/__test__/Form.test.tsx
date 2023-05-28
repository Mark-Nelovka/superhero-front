import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("Form test", () => {
  test("Open form", async () => {
    checkPageWithoutItem();
    const buttonOpenForm = screen.getByTestId("button-open-form");

    userEvent.click(buttonOpenForm);

    const form = await screen.findByTestId("form-for-hero");
    const backdrop = await screen.findByTestId("backdrop");

    expect(form).toBeInTheDocument();
    expect(backdrop).toBeInTheDocument();
  });

  test("Check data form", async () => {
    checkPageWithoutItem();
    const buttonOpenForm = screen.getByTestId("button-open-form");

    userEvent.click(buttonOpenForm);

    const nicknameInput = await screen.findByTestId("nickname");
    const realName = await screen.findByTestId("real_name");
    const description = await screen.findByTestId("description");
    const superpowers = await screen.findByTestId("superpowers");
    const phrase = await screen.findByTestId("phrase");
    const file = await screen.findByTestId("file");
    const buttonSubmit = await screen.findByTestId("Create");

    expect(nicknameInput).toBeInTheDocument();
    expect(realName).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(superpowers).toBeInTheDocument();
    expect(phrase).toBeInTheDocument();
    expect(file).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();

    userEvent.type(nicknameInput, "Superman");
    userEvent.type(realName, "Alex");
    userEvent.type(description, "Male");
    userEvent.type(superpowers, "Don't DRY");
    userEvent.type(phrase, "phrase");

    expect(nicknameInput).toHaveValue("Superman");
    expect(realName).toHaveValue("Alex");
    expect(description).toHaveValue("Male");
    expect(superpowers).toHaveValue("Don't DRY");
    expect(phrase).toHaveValue("phrase");
  });
});
