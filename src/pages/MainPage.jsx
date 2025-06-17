import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 16px;
  max-width: 480px;
  margin: 0 auto;
`;

const MainPage = () => (
  <PageWrapper>
    <Main>
      <h1>Welcome to SUKREAM</h1>
      <p>메인페이지입니다🥺</p>
      <Link to="/products">상품 목록페이지 이동(임시)</Link>
    </Main>
  </PageWrapper>
);

export default MainPage;
