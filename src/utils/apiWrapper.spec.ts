import { loadConversionTable } from "./apiWrapper";
import eurTable from "../mock/baseEurConversion.json";

describe("apiWrapper", () => {
  beforeEach(() => {
    // @ts-ignore
    fetch.resetMocks();
  });

  it("should return eurTable when using mock", async () => {
    // @ts-ignore
    fetch.mockResponseOnce(JSON.stringify(eurTable));
    const conversionTable = await loadConversionTable("EUR");

    expect(conversionTable).toEqual(eurTable);
  });
});
