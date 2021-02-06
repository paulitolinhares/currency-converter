import { performConversion } from "./performConversion";

describe("performConversion", () => {
  it("should convert EUR according to mock data", () => {
    const expected = performConversion("EUR", "USD", 10);

    expect(expected).toEqual(11.983);
  });
});
