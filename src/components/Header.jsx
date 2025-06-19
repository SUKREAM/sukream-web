import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import mypageImg from "../assets/images/myBtn.svg";

const HeaderWrapper = styled.header`
  background: #ffffff;
  color: #fff;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 30px;
`;

const IconButton = styled(Link)`
  display: inline-block;
  width: 45px;
  height: 45px;
  margin-left: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Header = () => (
  <HeaderWrapper>
    <Logo to="/">
      <LogoImg src={logoImg} alt="SUKREAM Logo" />
    </Logo>

    <div>
      <IconButton to="/mypage">
        <img src={mypageImg} alt="My Page" />
      </IconButton>
    </div>
  </HeaderWrapper>
);

export default Header;
