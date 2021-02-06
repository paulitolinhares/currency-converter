import eurTable from "../mock/baseEurConversion.json";
import usdTable from "../mock/baseUsdConversion.json";
import jpyTable from "../mock/baseJpyConversion.json";
import { Currency } from "../types/Currency";

// TODO fix types for real API
const conversionTable: { [key: string]: any } = {
  EUR: eurTable,
  USD: usdTable,
  JPY: jpyTable,
};

export function performConversion(
  from: Currency["code"],
  to: Currency["code"],
  amount: number
) {
  console.log({ from, to, amount });
  const table = conversionTable[from];

  const multiplicationFactor = table.rates[to];

  // Fixes broken float calculations up to 5 decimal digits
  return parseFloat((amount * multiplicationFactor).toFixed(5));
}
