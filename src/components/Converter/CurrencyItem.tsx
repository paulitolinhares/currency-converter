import React, { ChangeEvent } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Currency } from "../../types/Currency";
import {
  ChangeAmountAction,
  ChangeCurrencyAction,
  ConverterAction,
} from "./reducer";

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
  const handleCurrencyChange = (value: string) => {
    const action: ChangeCurrencyAction = {
      type: "changeCurrency",
      payload: {
        from: currency.code,
        to: value,
      },
    };
    dispatch(action);
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
  };
  return (
    <Wrapper>
      <TextField
        id="standard-select-currency"
        select
        label="Select"
        value={currency.code}
        onChange={(e) => handleCurrencyChange(e.target.value)}
        helperText="Please select your currency"
      >
        {currencies.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.name ?? option.code}
          </MenuItem>
        ))}
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
