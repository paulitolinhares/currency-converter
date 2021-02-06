import React, { useReducer } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { CurrencyItem } from "./CurrencyItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { initialState, reducer } from "./reducer";

export const Converter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Card>
      {state.elements.map((el) => (
        <CurrencyItem
          key={el.currency.code}
          currencies={state.availableCurrencies}
          currency={el.currency}
          amount={el.amount}
          dispatch={dispatch}
        />
      ))}

      {/* TODO implement this feature */}
      <ButtonWrapper>
        <Button
          title="Feature not yet available"
          disabled
          variant="contained"
          color="primary"
          startIcon={<Icon>add</Icon>}
        >
          Add new currency
        </Button>
      </ButtonWrapper>
    </Card>
  );
};

const ButtonWrapper = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin: 0 16px 16px;
`;
