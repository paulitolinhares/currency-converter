import React from "react";
import styled from "styled-components";

export const Layout: React.FC = () => (
  <LayoutContainer>
    <Content>Content</Content>
    <Footer>test</Footer>
  </LayoutContainer>
);

const LayoutContainer = styled.div`
  display: flex;
`;

const Content = styled.main`
  background-color: tomato;
  min-width: 500px;
  min-height: 500px;
`;

const Footer = styled.footer`
  background-color: hotpink;
  width: 100%;
  height: 20px;
`;
