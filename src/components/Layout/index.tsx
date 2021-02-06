import React from "react";
import styled from "styled-components";
import { Converter } from "../Converter";

import { Footer } from "../Footer";

export const Layout: React.FC = () => (
  <LayoutContainer>
    <Content>
      <Converter />
    </Content>
    <Footer />
  </LayoutContainer>
);

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "main"
    "footer";
  height: 100vh;
`;

const Content = styled.main`
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
`;
