import { Dispatch } from "react";
import { Currency } from "../../types/Currency";
import { CurrencyTable } from "../../types/CurrencyTable";
import { loadConversionTable } from "../../utils/apiWrapper";
import { performConversion } from "../../utils/performConversion";

export type ActionType =
  | "initialize"
  | "changeCurrency"
  | "changeAmount"
  | "loadCurrencyTable"
  | "updateCurrencyTable"
  | "addCurrency";

export interface ConverterAction {
  type: ActionType;
}

export interface ChangeCurrencyAction extends ConverterAction {
  type: "changeCurrency";
  payload: {
    from: Currency["code"];
    to: Currency["code"];
    amount: number;
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

export interface LoadCurrencyTableAction extends ConverterAction {
  type: "loadCurrencyTable";
  payload: {
    currencyCode: Currency["code"];
    amount: number;
  };
}

export interface UpdateCurrencyTableAction extends ConverterAction {
  type: "updateCurrencyTable";
  payload: {
    currencyCode: Currency["code"];
    currencyTable: CurrencyTable;
    amount: number;
  };
}

export interface AddCurrencyAction extends ConverterAction {
  type: "addCurrency";
}

interface ConverterState {
  availableCurrencies: Currency[];
  elements: Array<{
    currency: Currency;
    amount: number;
  }>;
}

export const initialState: ConverterState = {
  availableCurrencies: [],
  elements: [],
};

// Place actions that trigger async actions in this middleware
export function asyncMiddleware(dispatch: Dispatch<ConverterAction>) {
  return function (action: ConverterAction) {
    switch (action.type) {
      case "loadCurrencyTable":
        const payload = (action as LoadCurrencyTableAction).payload;
        loadConversionTable(payload.currencyCode).then((currencyTable) => {
          dispatch({
            type: "updateCurrencyTable",
            payload: {
              currencyTable: currencyTable,
              currencyCode: payload.currencyCode,
              amount: payload.amount,
            },
          } as UpdateCurrencyTableAction);
        });
        break;
      default:
        return dispatch(action);
    }
  };
}

// Place synchronous actions here
export function reducer(
  state: ConverterState,
  action: ConverterAction
): ConverterState {
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
    case "updateCurrencyTable":
      return updateCurrencyTableReducer(
        state,
        (action as UpdateCurrencyTableAction).payload
      );
    case "addCurrency":
      return addCurrencyReducer(state);
  }

  return state;
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
      return {
        currency: {
          code: payload.to,
          name: payload.to,
        },
        amount: payload.amount,
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

    return el;
  });

  const newState = { ...state, elements: newElementsState };
  return newState;
}

function updateCurrencyTableReducer(
  state: ConverterState,
  payload: UpdateCurrencyTableAction["payload"]
) {
  const newElementsState = [...state.elements].map((el) => {
    const amount =
      el.currency.code === payload.currencyCode
        ? el.amount
        : performConversion(
            payload.currencyTable,
            el.currency.code,
            payload.amount
          );
    return {
      currency: el.currency,
      amount,
    };
  });

  const newState = { ...state, elements: newElementsState };
  return newState;
}

function addCurrencyReducer(state: ConverterState) {
  const availableCurrenciesCopy = [...state.availableCurrencies];
  const newCurrency = availableCurrenciesCopy.shift();

  if (!newCurrency) {
    throw new Error("Not enough currencies available");
  }

  const newState = {
    ...state,
    availableCurrencies: availableCurrenciesCopy,
    elements: [
      ...state.elements,
      {
        currency: newCurrency,
        amount: 0,
      },
    ],
  };

  return newState;
}
