import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Currency } from "../../types/Currency";
import {
  ChangeAmountAction,
  ChangeCurrencyAction,
  ConverterAction,
  LoadCurrencyTableAction,
} from "./reducer";

import debounce from "lodash.debounce";

interface ICurrencyItem {
  currencies: Currency[];
  currency: Currency;
  amount: number;
  dispatch: React.Dispatch<ConverterAction>;
}

export const CurrencyItem: React.FC<ICurrencyItem> = ({
  dispatch,
  currencies,
  currency,
  amount,
}) => {
  const dispatchCurrencyTable = debounce((value: number, currencyCode) => {
    console.log(`loading currencyTable for ${currencyCode}`);
    const action: LoadCurrencyTableAction = {
      type: "loadCurrencyTable",
      payload: {
        currencyCode,
        amount: value,
      },
    };

    dispatch(action);
  }, 1000);

  const handleCurrencyChange = (value: string) => {
    const action: ChangeCurrencyAction = {
      type: "changeCurrency",
      payload: {
        from: currency.code,
        to: value,
        amount,
      },
    };
    dispatch(action);
    dispatchCurrencyTable(amount, value);
  };

  const handleAmountChange = (value: number) => {
    const action: ChangeAmountAction = {
      type: "changeAmount",
      payload: {
        amount: value,
        currency,
      },
    };
    dispatch(action);
    dispatchCurrencyTable(value, currency.code);
  };
  return (
    <Wrapper>
      <TextField
        select
        label="Currency"
        value={currency.code}
        onChange={(e) => handleCurrencyChange(e.target.value)}
        helperText="Please select your currency"
      >
        {[currency, ...currencies].map((option) => {
          return (
            <MenuItem key={option.code} value={option.code}>
              {option.name ?? option.code}
            </MenuItem>
          );
        })}
      </TextField>
      <TextField
        label="Amount"
        value={amount}
        type="number"
        onChange={(e) => handleAmountChange(Number(e.target.value))}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 16px 0;

  & > .MuiTextField-root {
    margin-left: 16px;
    margin-right: 16px;
  }
`;
