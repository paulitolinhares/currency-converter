import { Currency } from "../../types/Currency";

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
    code: "BTC",
    name: "฿",
  },
  {
    code: "JPY",
    name: "¥",
  },
];

export type ActionType = "changeCurrency" | "changeAmount";

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
    case "changeCurrency":
      return changeCurrencyReducer(
        state,
        (action as ChangeCurrencyAction).payload
      );
    case "changeAmount":
      return changeAmountReducer(state, (action as ChangeAmountAction).payload);
  }
}

function changeCurrencyReducer(
  state: ConverterState,
  payload: ChangeCurrencyAction["payload"]
): ConverterState {
  const copyElements = [...state.elements];
  const positionToChange = state.elements.findIndex(
    (el) => el.currency.code === payload.from
  );

  const newCurrencyObj = currencies.find((el) => el.code === payload.to);

  if (!newCurrencyObj) {
    throw new Error("Invalid currency code!");
  }

  copyElements[positionToChange] = {
    currency: newCurrencyObj,
    amount: state.elements[positionToChange].amount,
  };

  const newState = {
    ...state,
    elements: copyElements,
  };
  return newState;
}

function changeAmountReducer(
  state: ConverterState,
  payload: ChangeAmountAction["payload"]
): ConverterState {
  const copyElements = [...state.elements];
  const positionToChange = state.elements.findIndex(
    (el) => el.currency.code === payload.currency.code
  );
  copyElements[positionToChange] = { ...payload };

  const newState = { ...state, elements: copyElements };
  return newState;
}
