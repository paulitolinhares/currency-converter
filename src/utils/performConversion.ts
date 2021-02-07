import eurTable from "../mock/baseEurConversion.json";
import usdTable from "../mock/baseUsdConversion.json";
import jpyTable from "../mock/baseJpyConversion.json";
import { Currency } from "../types/Currency";
import { CurrencyTable } from "../types/CurrencyTable";

// TODO fix types for real API
const conversionTable: { [key: string]: any } = {
  EUR: eurTable,
  USD: usdTable,
  JPY: jpyTable,
};

export function performConversion(
  curerncyTable: CurrencyTable,
  to: Currency["code"],
  amount: number
) {
  const multiplicationFactor = curerncyTable.rates[to];

  // Fixes broken float calculations up to 5 decimal digits
  return parseFloat((amount * multiplicationFactor).toFixed(5));
}
