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

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  margin-top: 12px;
`;

const ProductLink = styled(Link)`
  display: block;
  padding: 12px;
  background: #fff;
  border-radius: 6px;
  color: #222;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductListPage = () => (
  <PageWrapper>
    <Main>
      <h2>상품 목록</h2>
      <ProductList>
        <ProductItem>
          <ProductLink to="/products/1">나이키 에어맥스</ProductLink>
        </ProductItem>
        <ProductItem>
          <ProductLink to="/products/2">아디다스 이지부스트</ProductLink>
        </ProductItem>
      </ProductList>
    </Main>
  </PageWrapper>
);

export default ProductListPage;
