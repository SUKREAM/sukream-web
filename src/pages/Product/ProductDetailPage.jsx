import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

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

const ProductDetailPage = () => {
  const { id } = useParams();

  return (
    <PageWrapper>
      <Main>
        <h2>상품 상세</h2>
        <p>상품 ID: {id}</p>
        <p>여기에 상품 상세 정보가 표시됩니다.</p>
      </Main>
    </PageWrapper>
  );
};

export default ProductDetailPage;
