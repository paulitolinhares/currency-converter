import React from "react";
import styled from "styled-components";

export const Layout: React.FC = () => (
  <LayoutContainer>
    <Content>Content</Content>
    <Footer>test</Footer>
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

  background: rgba(0, 0, 0, 0.4);
`;

const Content = styled.main`
  grid-area: main;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: hotpink;
  width: 100%;
  height: 20px;
`;
