import React from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
describe("login", () => {
  test("set isLoggedIn status to true", () => {
    const TestComponent = () => {
      const { login, isLoggedIn } = React.useContext(AuthContext);
      return (
        <>
          <div data-testid="value">{isLoggedIn.toString()}</div>
          <button onClick={login}>Login</button>
        </>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const divEl = screen.getByTestId("value");
    expect(divEl).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(divEl).toHaveTextContent(/true/i);
  });
});
