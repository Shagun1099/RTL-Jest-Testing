import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

describe("test login comp",()=>{
  test("username input should be there", () => {
  render(<Login />);
  const userInput = screen.getByPlaceholderText(/username/i);
  expect(userInput).toBeInTheDocument();
});

test("password input should be there", () => {
  render(<Login />);
  const passInput = screen.getByPlaceholderText(/password/i);
  expect(passInput).toBeInTheDocument();
});

test("login btn should be there", () => {
  render(<Login />);
  const btn = screen.getByRole("button");
  expect(btn).toBeInTheDocument();
});

test("inputs should be empty", () => {
  render(<Login />);
  const userInput = screen.getAllByPlaceholderText(/username/i);
  expect(userInput.value).toBe(undefined);
  const passInput = screen.getByPlaceholderText(/password/i);
  expect(passInput.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const btn = screen.getByRole("button");
  expect(btn).toBeDisabled();
});

test("error message should not be visible", () => {
  render(<Login />);
  const error = screen.getByTestId("error");
  expect(error).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const userInput = screen.getByPlaceholderText(/username/i);
  const testVal = "test";
  fireEvent.change(userInput, { target: { value: testVal } });
  expect(userInput.value).toBe(testVal);
});

test("password input should change", () => {
  render(<Login />);
  const passInput = screen.getByPlaceholderText(/password/i);
  const testVal = "test";
  fireEvent.change(passInput, { target: { value: testVal } });
  expect(passInput.value).toBe(testVal);
});

test("button should not be disabled when user types", () => {
  render(<Login />);
  const btn = screen.getByRole("button");
  const userInput = screen.getByPlaceholderText(/username/i);
  const passInput = screen.getByPlaceholderText(/password/i);

  const testVal = "test";

  fireEvent.change(userInput, { target: { value: testVal } });
  fireEvent.change(passInput, { target: { value: testVal } });

  expect(btn).not.toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login />);
  const btn = screen.getByRole("button");
  expect(btn).not.toHaveTextContent(/please wait/i);
});

test("loading should be rendered with click", () => {
  render(<Login />);
  const btn = screen.getByRole("button");
  const userInput = screen.getByPlaceholderText(/username/i);
  const passInput = screen.getByPlaceholderText(/password/i);

  const testVal = "test";

  fireEvent.change(userInput, { target: { value: testVal } });
  fireEvent.change(passInput, { target: { value: testVal } });
  fireEvent.click(btn);

  expect(btn).toHaveTextContent(/please wait.../i);
});

test("loading should not be rendered after fetching", async() => {
   render(<Login />);
   const btn = screen.getByRole("button");
   const userInput = screen.getByPlaceholderText(/username/i);
   const passInput = screen.getByPlaceholderText(/password/i);
 
   const testVal = "test";
 
   fireEvent.change(userInput, { target: { value: testVal } });
   fireEvent.change(passInput, { target: { value: testVal } });
   fireEvent.click(btn);
 
   await waitFor(()=>expect(btn).not.toHaveTextContent(/please wait.../i));
 });

 test("user should be rendered after fetching", async() => {
  render(<Login />);
  const btn = screen.getByRole("button");
  const userInput = screen.getByPlaceholderText(/username/i);
  const passInput = screen.getByPlaceholderText(/password/i);

  const testVal = "test";

  fireEvent.change(userInput, { target: { value: testVal } });
  fireEvent.change(passInput, { target: { value: testVal } });
  fireEvent.click(btn);

  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
})

});