import { Currency } from "../../types/Currency";
import { CurrencyTable } from "../../types/CurrencyTable";
import { performConversion } from "../../utils/performConversion";

const currencies: Currency[] = [
  {
    code: "USD",
    name: "$",
  },
  {
    code: "EUR",
    name: "€",
  },
  {
    code: "JPY",
    name: "¥",
  },
];

export type ActionType = "initialize" | "changeCurrency" | "changeAmount";

export interface ConverterAction {
  type: ActionType;
}

export interface ChangeCurrencyAction extends ConverterAction {
  type: "changeCurrency";
  payload: {
    from: Currency["code"];
    to: Currency["code"];
  };
}

export interface ChangeAmountAction extends ConverterAction {
  type: "changeAmount";
  payload: {
    amount: number;
    currency: Currency;
  };
}

export interface InitializeAction extends ConverterAction {
  type: "initialize";
  payload: {
    currencyTable: CurrencyTable;
  };
}

interface ConverterState {
  availableCurrencies: Currency[];
  elements: Array<{
    currency: Currency;
    amount: number;
  }>;
}

export const initialState: ConverterState = {
  availableCurrencies: currencies,
  elements: [
    {
      currency: currencies[0],
      amount: 0,
    },
    {
      currency: currencies[1],
      amount: 0,
    },
  ],
};

export function reducer(state: ConverterState, action: ConverterAction) {
  console.log({ action });
  switch (action.type) {
    case "initialize":
      return initializeReducer((action as InitializeAction).payload);
    case "changeCurrency":
      return changeCurrencyReducer(
        state,
        (action as ChangeCurrencyAction).payload
      );
    case "changeAmount":
      return changeAmountReducer(state, (action as ChangeAmountAction).payload);
  }
}

function initializeReducer(payload: InitializeAction["payload"]) {
  // TODO find something better to use than code as name
  const baseCurrency = {
    code: payload.currencyTable.base,
    name: payload.currencyTable.base,
  };
  const secondCurrencyCode = Object.entries(payload.currencyTable.rates)[0][0];

  const secondCurrency = {
    code: secondCurrencyCode,
    name: secondCurrencyCode,
  };
  const newState = {
    availableCurrencies: Object.entries(payload.currencyTable.rates)
      .filter(
        ([currencyCode]) =>
          ![payload.currencyTable.base, secondCurrencyCode].includes(
            currencyCode
          )
      )
      .map(([currencyCode]) => {
        return {
          code: currencyCode,
          name: currencyCode,
        };
      }),
    elements: [
      {
        currency: baseCurrency,
        amount: 0,
      },
      {
        currency: secondCurrency,
        amount: 0,
      },
    ],
  };

  return newState;
}

function changeCurrencyReducer(
  state: ConverterState,
  payload: ChangeCurrencyAction["payload"]
): ConverterState {
  const newElementsState = [...state.elements].map((el) => {
    if (el.currency.code === payload.from) {
      const newCurrencyObj = currencies.find(
        (currency) => currency.code === payload.to
      );
      if (!newCurrencyObj) {
        throw new Error("Invalid currency code!");
      }
      return {
        currency: newCurrencyObj,
        amount: performConversion(payload.from, payload.to, el.amount),
      };
    }

    return el;
  });

  const newState = {
    ...state,
    elements: newElementsState,
  };
  return newState;
}

function changeAmountReducer(
  state: ConverterState,
  payload: ChangeAmountAction["payload"]
): ConverterState {
  const newElementsState = [...state.elements].map((el) => {
    if (el.currency.code === payload.currency.code) {
      return payload;
    }

    return {
      currency: el.currency,
      amount: performConversion(
        payload.currency.code,
        el.currency.code,
        payload.amount
      ),
    };
  });

  const newState = { ...state, elements: newElementsState };
  return newState;
}
