import React from "react";
import styled from "styled-components";
import { LoginPage } from './User/LoginPage';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const OnBoardingPage = () => {
  return <PageWrapper><LoginPage/></PageWrapper>;
};

export default OnBoardingPage;
