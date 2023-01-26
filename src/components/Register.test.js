import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Register from "./Register";
import axios from "axios";

const firstName = "Test";
const lastName = "User";
const email = "test@gmail.com";

afterEach(cleanup);
beforeEach(() => {
  axios.post.mockResolvedValueOnce({ data: { firstName, lastName, email,id:1 } });
});

describe("test register comp.", () => {
  test("test the post register call properly", async() => {
    render(<Register />);
    const nameInputEl = screen.getByPlaceholderText(/first name/i);
    const lastNameInputEl = screen.getByPlaceholderText(/last name/i);
    const emailInputEl = screen.getByPlaceholderText(/email/i);
    const btnEl = screen.getByRole('button');
    fireEvent.change(nameInputEl,{target:{value:firstName}});
    fireEvent.change(lastNameInputEl,{target:{value:lastName}});
    fireEvent.change(emailInputEl,{target:{value:email}});
    fireEvent.click(btnEl);
    const userElement = await screen.findByText("Test User/test@gmail.com");
     expect(userElement).toBeInTheDocument();
  });
});
