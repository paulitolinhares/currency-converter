import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Divider />
      <FooterContent>
        <Typography>
          Currency converter by{" "}
          <Link
            href="https://github.com/paulitolinhares"
            title="Github profile"
          >
            Paulo Linhares
          </Link>
        </Typography>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  grid-area: footer;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
`;
