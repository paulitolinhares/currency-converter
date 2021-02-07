import { Currency } from "../types/Currency";
import { CurrencyTable } from "../types/CurrencyTable";

export function performConversion(
  curerncyTable: CurrencyTable,
  to: Currency["code"],
  amount: number
) {
  const multiplicationFactor = curerncyTable.rates[to];

  // Fixes broken float calculations up to 5 decimal digits
  return parseFloat((amount * multiplicationFactor).toFixed(5));
}
