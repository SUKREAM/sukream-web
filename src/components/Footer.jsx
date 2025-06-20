import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: #ffffff;
  color: #828282;
  text-align: center;
  padding: 30px 50px;
  font-size: 0.9rem;
`;

const Footer = () => (
  <FooterWrapper>&copy; 2025 SUKREAM. All rights reserved.</FooterWrapper>
);

export default Footer;
