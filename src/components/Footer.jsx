import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: #ffffff;
  color: black;
  text-align: center;
  padding: 12px 16px;
  font-size: 0.9rem;
`;

const Footer = () => (
  <FooterWrapper>&copy; 2025 SUKREAM. All rights reserved.</FooterWrapper>
);

export default Footer;
