import React, { ChangeEvent } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

interface ICurrencyItem {
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

export const CurrencyItem: React.FC<ICurrencyItem> = ({ onChange }) => (
  <Wrapper>
    <TextField
      id="standard-select-currency"
      select
      label="Select"
      value={"EUR"}
      onChange={onChange}
      helperText="Please select your currency"
    >
      {currencies.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    <TextField label="Amount" />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  padding: 16px 0;

  & > .MuiTextField-root {
    margin-left: 16px;
    margin-right: 16px;
  }
`;
