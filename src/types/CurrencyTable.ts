interface ConversionRate {
  [key: string]: number;
}

export interface CurrencyTable {
  base: string;
  date: string;
  rates: ConversionRate;
}
