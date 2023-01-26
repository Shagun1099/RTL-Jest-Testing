import { add } from "./functions";

jest.mock("./functions", () => {
  return {
    ...jest.requireActual("./functions"),
    add: jest.fn().mockReturnValue(1),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("test functions", () => {
  test("test add", () => {
    add.mockReturnValueOnce(1);
    expect(add(1, 2)).toBe(1);
    expect(add).toHaveBeenCalled();
    expect(add.mock.calls[0][0]).toBe(1);
    expect(add.mock.calls[0][1]).toBe(2);
  });
});
