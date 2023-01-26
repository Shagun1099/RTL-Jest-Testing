import { delayFive, delayOne } from "./timers";


beforeAll(()=>{
    jest.useFakeTimers();
});

afterEach(()=>{
  jest.clearAllTimers();
});

const func = jest.fn();
const name = "TEST";

describe("test timers",()=>{
  test("test delay five",()=>{
      delayFive(name,func);
      
      jest.advanceTimersByTime(5000);

      expect(func).toHaveBeenCalled();
  });

  test("test delay one",()=>{
      delayOne(name,func);
      expect(func).not.toHaveBeenCalled();
      jest.runOnlyPendingTimers();
      expect(func).toHaveBeenCalledTimes(1);
  })
});