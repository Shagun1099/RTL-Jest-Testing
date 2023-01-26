import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as APIService from "../services/api.js";
import Product from "./Product";
import axiosMock from 'axios';
import React from "react";

jest.mock("../services/api.js");

afterEach(cleanup);
beforeEach(()=>{
axiosMock.get.mockResolvedValue({data:{name:"Test User"}});
});

describe("test product comp", () => {
  test("make api call with proper params", async () => {
    APIService.getData.mockResolvedValueOnce({ ok: true });
    render(<Product />);
    const inputEl = screen.getByPlaceholderText(/enter product name/i);
    expect(inputEl).toBeInTheDocument();
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeInTheDocument();
    fireEvent.change(inputEl, { target: { value: "Test" } });
    fireEvent.click(buttonEl);
    expect(APIService.getData).toHaveBeenCalledTimes(1);
    expect(APIService.getData).toHaveBeenCalledWith("Test");
    await waitFor(() => null);
  });

  test('it should be loading initially',async()=>{
    const url = 'https://jsonplaceholder.typicode.com/users/1';
    render(<Product/>);
    const spanEl = screen.getByText(/loading.../i);
    expect(spanEl).toBeInTheDocument();
    const resolvedSpanEl = screen.getByRole('name')
    await waitFor(()=>expect(resolvedSpanEl).toHaveTextContent(/test user/i));
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(url);
  })
});
