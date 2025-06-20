import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import mypageImg from "../assets/images/myBtn.svg";

const HeaderWrapper = styled.header`
  margin: auto;
  background: #ffffff;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 27px;
`;

const IconButton = styled(Link)`
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-top: 13px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Header = () => (
  <HeaderWrapper>
    <Logo to="/main">
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
