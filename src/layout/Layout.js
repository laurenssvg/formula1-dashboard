import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

const LayoutWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  max-width: 1100px;
  margin: 0 auto;
`;

export default Layout;
