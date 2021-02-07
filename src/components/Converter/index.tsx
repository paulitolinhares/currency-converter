import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { CurrencyItem } from "./CurrencyItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {
  asyncMiddleware,
  InitializeAction,
  initialState,
  LoadCurrencyTableAction,
  reducer,
} from "./reducer";
import { loadConversionTable } from "../../utils/apiWrapper";

export const Converter: React.FC = () => {
  const [state, hookDispatch] = useReducer(reducer, initialState);
  const dispatch = asyncMiddleware(hookDispatch);
  useEffect(() => {
    const DEFAULT_CURRENCY = "EUR";
    loadConversionTable(DEFAULT_CURRENCY).then((defaultTable) => {
      console.log({ defaultTable });
      dispatch({
        type: "initialize",
        payload: {
          currencyTable: defaultTable,
        },
      } as InitializeAction);
    });
  }, []);
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
          variant="contained"
          color="primary"
          startIcon={<Icon>add</Icon>}
          onClick={() => {
            dispatch({ type: "addCurrency" });
            dispatch({
              type: "loadCurrencyTable",
              payload: {
                currencyCode: state.elements[0].currency.code,
                amount: state.elements[0].amount,
              },
            } as LoadCurrencyTableAction);
          }}
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
