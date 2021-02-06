import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { CurrencyItem } from "./CurrencyItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

export const Converter: React.FC = () => {
  return (
    <Card>
      <CurrencyItem
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <CurrencyItem
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
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
